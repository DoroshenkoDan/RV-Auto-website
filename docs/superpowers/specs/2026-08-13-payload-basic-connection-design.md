# Payload — базове підключення (design)

## Мета

Довести вже частково встановлений Payload 3.86 до робочого локального стану: admin-панель відкривається, підключена до Postgres, є перший адмін-юзер. Без доменних колекцій (авто тощо) — це окремий наступний етап.

## Поточний стан

- `src/payload.config.ts` — postgres-адаптер, lexical editor, локалізація `uk`/`en`, колекції `Users`, `Media`.
- `next.config.ts` — `withPayload` вже підключено поверх `next-intl`.
- `src/app/(payload)` — admin, REST (`/api/[...slug]`), GraphQL, GraphQL Playground роути вже згенеровані.
- `docker-compose.yml` — Postgres 16, контейнер `rvauto-postgres`, порт хоста `5433` → контейнер `5432`.
- `.env` — містив `DATABASE_URI=postgres://rvauto:rvauto@localhost:5432/rvauto` (порт не збігався з compose).
- `.env` в `.gitignore`, ніколи не комітився.

## План дій

1. Виправити `.env`: `DATABASE_URI` → `postgres://rvauto:rvauto@localhost:5433/rvauto`.
2. Підняти Postgres: `docker compose up -d` (Docker Desktop вже встановлено користувачем).
3. `npm run dev` — postgres-адаптер Payload у dev-режимі сам створює таблиці (push mode), окремі міграції не потрібні на цьому етапі.
4. Відкрити `http://localhost:3000/admin` — Payload запропонує створити першого адмін-юзера, бо колекція `users` порожня.
5. Перевірити `/api/graphql-playground` і REST (`/api/users`) — мають відповідати без помилок.

## Поза межами

- Колекція `Cars` під каталог авто.
- Підключення фронтенду (`Catalog` секція) до реальних даних Payload замість мокових `CATALOG_CARS`.
- Продакшн-налаштування (окремий `DATABASE_URI`, реальні міграції замість push mode, деплой).
