import { describe, expect, it } from "vitest";

import {
  ORDER_CAR_MAX_AGE,
  isContactsPath,
  isOrderCarSlug,
  resolveOrderCarSlug,
} from "./orderCar";

describe("ORDER_CAR_MAX_AGE", () => {
  it("keeps the selected car for three days", () => {
    expect(ORDER_CAR_MAX_AGE).toBe(3 * 24 * 60 * 60);
  });
});

describe("isOrderCarSlug", () => {
  it("accepts catalog slugs, including ones typed by hand in the admin", () => {
    expect(isOrderCarSlug("audi-a5-sportback-2018-red")).toBe(true);
    expect(isOrderCarSlug("AudiA5-4534-test")).toBe(true);
  });

  it("rejects values that cannot be a slug", () => {
    expect(isOrderCarSlug("")).toBe(false);
    expect(isOrderCarSlug("../admin")).toBe(false);
    expect(isOrderCarSlug("Audi A5")).toBe(false);
    expect(isOrderCarSlug("a".repeat(201))).toBe(false);
  });
});

describe("isContactsPath", () => {
  it("matches the contacts page with and without a locale", () => {
    expect(isContactsPath("/contacts")).toBe(true);
    expect(isContactsPath("/uk/contacts")).toBe(true);
    expect(isContactsPath("/en/contacts/")).toBe(true);
  });

  it("ignores other pages", () => {
    expect(isContactsPath("/uk/cars")).toBe(false);
    expect(isContactsPath("/uk/contacts-old")).toBe(false);
    expect(isContactsPath("/uk/cars/contacts")).toBe(false);
  });
});

describe("resolveOrderCarSlug", () => {
  it("prefers the car from the url over the stored one", () => {
    expect(
      resolveOrderCarSlug({
        carParam: "audi-a5",
        storedSlug: "toyota-rav4",
        hasCalculation: false,
      }),
    ).toBe("audi-a5");
  });

  it("falls back to the stored car", () => {
    expect(
      resolveOrderCarSlug({
        carParam: undefined,
        storedSlug: "toyota-rav4",
        hasCalculation: false,
      }),
    ).toBe("toyota-rav4");
  });

  it("shows no car when the visitor came with a calculation", () => {
    expect(
      resolveOrderCarSlug({
        carParam: "audi-a5",
        storedSlug: "toyota-rav4",
        hasCalculation: true,
      }),
    ).toBeNull();
  });

  it("ignores values that are not slugs", () => {
    expect(
      resolveOrderCarSlug({
        carParam: "Audi A5",
        storedSlug: "../x",
        hasCalculation: false,
      }),
    ).toBeNull();
  });
});
