# Payload Basic Connection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the already-scaffolded Payload 3.86 install to a working local state — admin panel reachable, connected to Postgres, first admin user created.

**Architecture:** No new code. Fix an env/config mismatch, start the existing Postgres container, run the existing Next.js dev server (which already wraps Payload via `withPayload`), and verify through the browser and HTTP checks. Payload's postgres adapter runs in push mode in dev (no NODE_ENV=production, no `prod: true` set on the adapter), so it creates tables from `payload.config.ts` automatically — no manual migration step.

**Tech Stack:** Payload 3.86, `@payloadcms/db-postgres`, Next.js 16.2.12, Docker Compose, Postgres 16-alpine.

## Global Constraints

- Do not commit `.env` — it's already gitignored (`.env*` in `.gitignore`).
- Do not change `docker-compose.yml` — user chose to align `.env` to the existing `5433:5432` host port mapping instead of changing the compose port.
- No domain collections (e.g. `Cars`) in this plan — out of scope per the approved spec (`docs/superpowers/specs/2026-08-13-payload-basic-connection-design.md`).

---

### Task 1: Fix the database port mismatch in `.env`

**Files:**
- Modify: `.env:1`

**Interfaces:**
- Consumes: `docker-compose.yml` `postgres` service, which maps host port `5433` → container port `5432` (service name `rvauto-postgres`).
- Produces: `DATABASE_URI` env var read by `src/payload.config.ts:25` (`postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || "" } })`).

- [ ] **Step 1: Edit `.env`**

Change line 1 from:
```
DATABASE_URI=postgres://rvauto:rvauto@localhost:5432/rvauto
```
to:
```
DATABASE_URI=postgres://rvauto:rvauto@localhost:5433/rvauto
```

- [ ] **Step 2: Confirm the file is correct**

Run: `grep DATABASE_URI .env`
Expected: `DATABASE_URI=postgres://rvauto:rvauto@localhost:5433/rvauto`

- [ ] **Step 3: Commit — skip**

`.env` is gitignored; there is nothing to commit for this task. Do not force-add it.

---

### Task 2: Start Postgres and verify connectivity

**Files:**
- None (uses existing `docker-compose.yml`)

**Interfaces:**
- Consumes: Docker Desktop (already installed per user), `docker-compose.yml` at repo root.
- Produces: A reachable Postgres instance at `localhost:5433`, database `rvauto`, user/password `rvauto`/`rvauto`, that Task 3 connects to.

- [ ] **Step 1: Start the container**

Run: `docker compose up -d`
Expected: output shows `rvauto-postgres` created/started, exit code 0.

- [ ] **Step 2: Verify the container is healthy**

Run: `docker ps --filter name=rvauto-postgres`
Expected: one row, `STATUS` shows `Up ...` (not `Restarting`).

- [ ] **Step 3: Verify Postgres accepts connections**

Run: `docker exec rvauto-postgres pg_isready -U rvauto -d rvauto`
Expected: `... accepting connections`

---

### Task 3: Start the dev server and verify Payload pushes schema

**Files:**
- None (uses existing `next.config.ts` / `src/payload.config.ts`)

**Interfaces:**
- Consumes: `DATABASE_URI` from Task 1, running Postgres from Task 2, `npm run dev` script (`package.json:6`, runs `next dev`, wrapped by `withPayload` in `next.config.ts:11`).
- Produces: A running Next.js dev server on `http://localhost:3000` with Payload initialized, tables created in the `rvauto` database, consumed by Task 4 and Task 5.

- [ ] **Step 1: Run the dev server**

Run: `npm run dev`
Expected: Next.js starts, no unhandled errors in the terminal, log shows the server ready on port 3000. Leave it running in the background for the remaining tasks.

- [ ] **Step 2: Verify tables were created**

Run: `docker exec rvauto-postgres psql -U rvauto -d rvauto -c "\dt"`
Expected: a table list including at least `users`, `media`, `payload_preferences`, `payload_locked_documents`.

---

### Task 4: Create the first admin user

**Files:**
- None (interactive step through the browser)

**Interfaces:**
- Consumes: Dev server from Task 3, `/admin` route from `src/app/(payload)/admin/[[...segments]]/page.tsx`, `Users` collection (`src/collections/Users.ts`, `auth: true`, no custom fields beyond email/password).
- Produces: A row in the `users` table with `email`/hashed password, used to log into `/admin` afterward.

- [ ] **Step 1: Open the admin panel**

Navigate to `http://localhost:3000/admin` in a browser.
Expected: Payload's "Create first user" screen (no existing users), not an error page.

- [ ] **Step 2: Create the admin account**

Fill in email + password on the create-first-user form and submit.
Expected: redirected into the Payload admin dashboard, sidebar shows `Users` and `Media` collections.

- [ ] **Step 3: Verify login persists**

Refresh `http://localhost:3000/admin`.
Expected: still authenticated, dashboard loads without redirecting to a login/create-user screen.

---

### Task 5: Verify REST and GraphQL APIs respond

**Files:**
- None (HTTP verification only)

**Interfaces:**
- Consumes: Dev server from Task 3, admin user from Task 4, REST route `src/app/(payload)/api/[...slug]/route.ts`, GraphQL route `src/app/(payload)/api/graphql/route.ts`, playground route `src/app/(payload)/api/graphql-playground/route.ts`.
- Produces: Confirmation that the API surface Payload generates is reachable — this is the acceptance check for the whole plan.

- [ ] **Step 1: Check the REST users endpoint**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users`
Expected: `200` (public read is Payload's default for an authenticated request context in dev; a `401`/`403` with a JSON error body is also acceptable here — the goal is a routed response, not a raw connection failure).

- [ ] **Step 2: Check the GraphQL Playground**

Navigate to `http://localhost:3000/api/graphql-playground` in a browser.
Expected: the GraphQL Playground UI loads (not a 404 or 500).

- [ ] **Step 3: Record the result**

No code changes in this task — this is the final verification gate for the plan. If both checks pass, the plan is complete: Payload admin is reachable, backed by Postgres, with a working admin user and live API routes.
