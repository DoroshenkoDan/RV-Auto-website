import type { Car } from "@/payload-types";

export type LeadMode = "simple" | "detailed";

export type { Messenger } from "@/lib/leads";

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
