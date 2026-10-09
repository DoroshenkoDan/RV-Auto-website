import type { LeadSource, Messenger } from "../types";

export const KEYCRM_API_URL = "https://openapi.keycrm.app/v1";

export const PIPELINE_ID = 4;

export const SOURCE_ID = 2;

export const MESSENGER_FIELD = "LD_1002";

export const CAR_FIELD = "LD_1003";

export const TOTAL_FIELD = "LD_1004";

export const MESSENGER_LABELS: Record<Messenger, string> = {
  telegram: "Telegram",
  viber: "Viber",
  whatsapp: "WhatsApp",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  cta: "блок заклику на сайті",
  callback: "кнопка «Передзвоніть мені»",
  contacts: "сторінка контактів",
};

export const REQUEST_TIMEOUT_MS = 8000;

export const RETRY_DELAY_MS = 1000;
