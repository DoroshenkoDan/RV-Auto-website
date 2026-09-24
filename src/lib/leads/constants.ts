export const NAME_MIN = 2;
export const NAME_MAX = 60;
export const NAME_PATTERN = /^\p{L}[\p{L}\s'’-]*$/u;

export const PHONE_RAW_MAX = 20;
export const PHONE_PATTERN = /^\+?\d{10,15}$/;

export const COMMENT_MAX = 600;

export const MESSENGERS = ["telegram", "viber", "whatsapp"] as const;

export const LEAD_SOURCES = ["cta", "callback", "contacts"] as const;

export const HONEYPOT_FIELD = "leadRef";

export const RENDERED_FIELD = "rendered";

export const RENDERED_TOKEN = "1";

export function normalizePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}
