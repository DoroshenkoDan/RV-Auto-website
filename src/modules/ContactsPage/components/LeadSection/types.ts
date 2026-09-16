import type { CalculatorInput } from "@/lib/calculator/types";
import type { Car } from "@/payload-types";

export type LeadMode = "simple" | "detailed";

export type Messenger = "telegram" | "viber" | "whatsapp";

export type LeadCar = Pick<
  Car,
  | "slug"
  | "title"
  | "year"
  | "mileageKm"
  | "engine"
  | "drivetrain"
  | "transmission"
> & {
  photo: { url: string; alt: string } | null;
};

export type LeadValues = {
  name: string;
  phone: string;
  messenger: Messenger;
  comment: string;
  calculation: { input: CalculatorInput; total: number } | null;
  car: Pick<LeadCar, "slug" | "title"> | null;
};
