import { z } from "zod";

import {
  AUCTION_TYPES,
  BATTERY_CAPACITY_LIMITS,
  ENGINE_VOLUME_LIMITS,
  FUEL_TYPES,
  LOT_PRICE_LIMITS,
  VEHICLE_TYPES,
  getYearOptions,
} from "@/lib/calculator/options";
import { isOrderCarSlug } from "@/lib/catalog/orderCar";

import {
  COMMENT_MAX,
  LEAD_SOURCES,
  MESSENGERS,
  NAME_MAX,
  NAME_MIN,
  NAME_PATTERN,
  PHONE_PATTERN,
  PHONE_RAW_MAX,
  normalizePhone,
} from "./constants";

const calculatorInputSchema = z
  .object({
    fuel: z.enum(FUEL_TYPES),
    vehicle: z.enum(VEHICLE_TYPES),
    auction: z.enum(AUCTION_TYPES),
    engineVolume: z.number().int().nullable(),
    batteryCapacity: z.number().int().nullable(),
    year: z.number().int(),
    lotPrice: z
      .number()
      .int()
      .min(LOT_PRICE_LIMITS.min)
      .max(LOT_PRICE_LIMITS.max),
  })
  .superRefine((value, ctx) => {
    const years = getYearOptions();

    if (value.year > years[0] || value.year < years[years.length - 1]) {
      ctx.addIssue({ code: "custom", path: ["year"], message: "out of range" });
    }

    if (value.fuel === "electric") {
      if (value.engineVolume !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["engineVolume"],
          message: "must be null",
        });
      }

      if (
        value.batteryCapacity === null ||
        value.batteryCapacity < BATTERY_CAPACITY_LIMITS.min ||
        value.batteryCapacity > BATTERY_CAPACITY_LIMITS.max
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["batteryCapacity"],
          message: "out of range",
        });
      }

      return;
    }

    if (value.batteryCapacity !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["batteryCapacity"],
        message: "must be null",
      });
    }

    const limits = ENGINE_VOLUME_LIMITS[value.vehicle];

    if (
      value.engineVolume === null ||
      value.engineVolume < limits.min ||
      value.engineVolume > limits.max
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["engineVolume"],
        message: "out of range",
      });
    }
  });

export const leadSchema = z.object({
  name: z.string().trim().min(NAME_MIN).max(NAME_MAX).regex(NAME_PATTERN),
  phone: z
    .string()
    .max(PHONE_RAW_MAX)
    .transform(normalizePhone)
    .refine((value) => PHONE_PATTERN.test(value)),
  messenger: z.enum(MESSENGERS),
  source: z.enum(LEAD_SOURCES),
  comment: z.string().trim().max(COMMENT_MAX).default(""),
  calculation: calculatorInputSchema.nullable().default(null),
  carSlug: z.string().refine(isOrderCarSlug).nullable().default(null),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export function parseLead(raw: unknown) {
  const strict = leadSchema.safeParse(raw);

  if (strict.success) {
    return { ok: true as const, lead: strict.data };
  }

  const source = typeof raw === "object" && raw !== null ? raw : {};

  const degraded = leadSchema.safeParse({ ...source, calculation: null });

  if (degraded.success) {
    return { ok: true as const, lead: degraded.data };
  }

  return { ok: false as const };
}
