import type { CalculatorInput } from "@/lib/calculator/types";

export type LeadMode = "simple" | "detailed";

export type Messenger = "telegram" | "viber" | "whatsapp";

export type LeadValues = {
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  calculation: { input: CalculatorInput; total: number } | null;
};
