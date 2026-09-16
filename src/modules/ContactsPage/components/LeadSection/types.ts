import type { CalculatorInput } from "@/lib/calculator/types";

export type LeadMode = "simple" | "detailed";

export type Messenger = "telegram" | "viber" | "whatsapp";

export type LeadCar = {
  slug: string;
  title: string;
};

export type LeadValues = {
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  calculation: { input: CalculatorInput; total: number } | null;
  car: LeadCar | null;
};
