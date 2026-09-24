import { describe, expect, it } from "vitest";

import { DEFAULT_CALCULATOR_INPUT } from "@/lib/calculator/options";

import { NAME_MAX, NAME_MIN } from "./constants";
import { leadSchema, parseLead } from "./schema";

const base = {
  name: "Даниїл",
  phone: "+380671234567",
  messenger: "telegram",
  source: "cta",
};

const petrolCar = {
  ...DEFAULT_CALCULATOR_INPUT,
  fuel: "petrol",
  vehicle: "suv",
  auction: "iaai",
  engineVolume: 2500,
  year: 2019,
  lotPrice: 12000,
};

describe("leadSchema name", () => {
  it("accepts a unicode name with an apostrophe", () => {
    expect(leadSchema.safeParse({ ...base, name: "В'ячеслав" }).success).toBe(
      true,
    );
  });

  it("accepts a name of exactly the minimum length", () => {
    expect(
      leadSchema.safeParse({ ...base, name: "О".repeat(NAME_MIN) }).success,
    ).toBe(true);
  });

  it("accepts a name of exactly the maximum length", () => {
    expect(
      leadSchema.safeParse({ ...base, name: "О".repeat(NAME_MAX) }).success,
    ).toBe(true);
  });

  it("rejects a name one character over the maximum", () => {
    expect(
      leadSchema.safeParse({ ...base, name: "О".repeat(NAME_MAX + 1) }).success,
    ).toBe(false);
  });

  it("rejects a name that is only whitespace", () => {
    expect(leadSchema.safeParse({ ...base, name: "   " }).success).toBe(false);
  });

  it("rejects a name starting with a digit", () => {
    expect(leadSchema.safeParse({ ...base, name: "1Тарас" }).success).toBe(
      false,
    );
  });

  it("trims surrounding whitespace", () => {
    const result = leadSchema.safeParse({ ...base, name: "  Тарас  " });

    expect(result.success && result.data.name).toBe("Тарас");
  });
});

describe("leadSchema phone", () => {
  it("normalizes a formatted number", () => {
    const result = leadSchema.safeParse({
      ...base,
      phone: "+38 (067) 123-45-67",
    });

    expect(result.success && result.data.phone).toBe("+380671234567");
  });

  it("rejects letters that fit within the raw length limit", () => {
    expect(
      leadSchema.safeParse({ ...base, phone: "+380abcdefghij" }).success,
    ).toBe(false);
  });

  it("rejects a number that is too short", () => {
    expect(leadSchema.safeParse({ ...base, phone: "+38067" }).success).toBe(
      false,
    );
  });

  it("rejects raw input longer than the limit", () => {
    expect(
      leadSchema.safeParse({ ...base, phone: "+3806712345678901234567" })
        .success,
    ).toBe(false);
  });
});

describe("leadSchema defaults", () => {
  it("defaults the comment, calculation and car slug", () => {
    const result = leadSchema.safeParse(base);

    expect(result.success && result.data.comment).toBe("");
    expect(result.success && result.data.calculation).toBe(null);
    expect(result.success && result.data.carSlug).toBe(null);
  });

  it("rejects an unknown messenger", () => {
    expect(leadSchema.safeParse({ ...base, messenger: "signal" }).success).toBe(
      false,
    );
  });

  it("rejects an unknown source", () => {
    expect(
      leadSchema.safeParse({ ...base, source: "newsletter" }).success,
    ).toBe(false);
  });

  it("rejects a car slug with illegal characters", () => {
    expect(
      leadSchema.safeParse({ ...base, carSlug: "../../etc/passwd" }).success,
    ).toBe(false);
  });
});

describe("leadSchema calculation", () => {
  it("accepts a valid combustion calculation", () => {
    expect(
      leadSchema.safeParse({ ...base, calculation: petrolCar }).success,
    ).toBe(true);
  });

  it("rejects an engine volume valid for a car but not for a motorcycle", () => {
    expect(
      leadSchema.safeParse({
        ...base,
        calculation: {
          ...petrolCar,
          vehicle: "motorcycle",
          engineVolume: 8000,
        },
      }).success,
    ).toBe(false);
  });

  it("rejects a battery capacity on a combustion car", () => {
    expect(
      leadSchema.safeParse({
        ...base,
        calculation: { ...petrolCar, batteryCapacity: 60 },
      }).success,
    ).toBe(false);
  });

  it("rejects an electric car without a battery capacity", () => {
    expect(
      leadSchema.safeParse({
        ...base,
        calculation: {
          ...petrolCar,
          fuel: "electric",
          engineVolume: null,
          batteryCapacity: null,
        },
      }).success,
    ).toBe(false);
  });

  it("rejects a lot price above the limit", () => {
    expect(
      leadSchema.safeParse({
        ...base,
        calculation: { ...petrolCar, lotPrice: 9_000_000 },
      }).success,
    ).toBe(false);
  });

  it("rejects a year in the future", () => {
    expect(
      leadSchema.safeParse({
        ...base,
        calculation: { ...petrolCar, year: new Date().getFullYear() + 1 },
      }).success,
    ).toBe(false);
  });

  it("ignores a total sent by the client", () => {
    const result = leadSchema.safeParse({
      ...base,
      calculation: { ...petrolCar, total: 1 },
    });

    expect(result.success).toBe(true);
    expect(
      result.success && result.data.calculation !== null
        ? Object.keys(result.data.calculation).includes("total")
        : "no calculation",
    ).toBe(false);
  });
});

describe("parseLead", () => {
  it("returns the lead when everything is valid", () => {
    const outcome = parseLead({ ...base, calculation: petrolCar });

    expect(outcome.ok && outcome.lead.name).toBe("Даниїл");
    expect(outcome.ok && outcome.lead.calculation).not.toBe(null);
  });

  it("drops a stale calculation instead of rejecting the whole lead", () => {
    const outcome = parseLead({
      ...base,
      calculation: { ...petrolCar, fuel: "electric", batteryCapacity: 75 },
    });

    expect(outcome.ok).toBe(true);
    expect(outcome.ok && outcome.lead.calculation).toBe(null);
    expect(outcome.ok && outcome.lead.phone).toBe("+380671234567");
  });

  it("drops an engine volume out of range for the chosen vehicle", () => {
    const outcome = parseLead({
      ...base,
      calculation: { ...petrolCar, vehicle: "motorcycle", engineVolume: 8000 },
    });

    expect(outcome.ok).toBe(true);
    expect(outcome.ok && outcome.lead.calculation).toBe(null);
  });

  it("drops a fractional lot price rather than losing the contact details", () => {
    const outcome = parseLead({
      ...base,
      calculation: { ...petrolCar, lotPrice: 20000.5 },
    });

    expect(outcome.ok).toBe(true);
    expect(outcome.ok && outcome.lead.calculation).toBe(null);
  });

  it("still rejects the lead when the contact details are invalid", () => {
    expect(parseLead({ ...base, phone: "nope" }).ok).toBe(false);
  });
});
