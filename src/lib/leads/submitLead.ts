"use server";

import { headers } from "next/headers";

import { estimate } from "@/lib/calculator/estimate";

import { checkAntibot } from "./antibot";
import { HONEYPOT_FIELD, RENDERED_FIELD } from "./constants";
import { deliver } from "./deliver";
import { checkRateLimit, recordLead } from "./rateLimit";
import { parseLead } from "./schema";
import type { Lead, LeadResult } from "./types";

async function getClientIp() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();

    if (first) {
      return first;
    }
  }

  return headerList.get("x-real-ip")?.trim() || null;
}

export async function submitLead(input: unknown): Promise<LeadResult> {
  const now = Date.now();
  const ip = await getClientIp();

  if (!checkRateLimit({ ip, now }).allowed) {
    return { ok: false, reason: "rate-limited" };
  }

  const raw =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  if (
    process.env.NODE_ENV !== "production" &&
    raw[RENDERED_FIELD] === undefined
  ) {
    console.error(
      `[leads] ${RENDERED_FIELD} missing from the payload: the form is not sending useLeadGuards().readGuards(), so every submission will be discarded as a bot.`,
    );
  }

  const verdict = checkAntibot({
    honeypot: raw[HONEYPOT_FIELD],
    rendered: raw[RENDERED_FIELD],
  });

  if (verdict === "bot") {
    return { ok: true };
  }

  const parsed = parseLead(raw);

  if (!parsed.ok) {
    return { ok: false, reason: "invalid" };
  }

  const { calculation, ...rest } = parsed.lead;

  const lead: Lead = { ...rest, calculation: null };

  if (calculation) {
    const result = estimate(calculation);

    if (result) {
      lead.calculation = { input: calculation, total: result.total };
    }
  }

  try {
    await deliver(lead);
  } catch {
    return { ok: false, reason: "failed" };
  }

  recordLead({ ip, now });

  return { ok: true };
}
