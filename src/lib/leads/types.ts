import type { CalculatorInput } from "@/lib/calculator/types";

import type { LEAD_SOURCES, MESSENGERS } from "./constants";

export type Messenger = (typeof MESSENGERS)[number];

export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Lead = {
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  source: LeadSource;
  calculation: { input: CalculatorInput; total: number } | null;
  carSlug: string | null;
};

export type LeadFailureReason = "invalid" | "rate-limited" | "failed";

export type LeadResult =
  { ok: true } | { ok: false; reason: LeadFailureReason };
