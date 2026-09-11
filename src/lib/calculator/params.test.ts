import { describe, expect, it } from "vitest";

import { DEFAULT_CALCULATOR_INPUT } from "./options";
import { parseCalculatorParams, toCalculatorParams } from "./params";
import type { CalculatorInput } from "./types";

const petrolCar: CalculatorInput = {
  ...DEFAULT_CALCULATOR_INPUT,
  fuel: "petrol",
  vehicle: "suv",
  auction: "iaai",
  engineVolume: 2500,
  year: 2019,
  lotPrice: 12000,
};

const electricCar: CalculatorInput = {
  ...DEFAULT_CALCULATOR_INPUT,
  fuel: "electric",
  engineVolume: null,
  batteryCapacity: 60,
  year: 2021,
  lotPrice: 18000,
};

describe("toCalculatorParams", () => {
  it("omits the battery capacity for a combustion car", () => {
    expect(toCalculatorParams(petrolCar)).not.toHaveProperty("battery");
  });

  it("omits the engine volume for an electric car", () => {
    expect(toCalculatorParams(electricCar)).not.toHaveProperty("engine");
  });
});

describe("parseCalculatorParams", () => {
  it("reads back what toCalculatorParams wrote for a combustion car", () => {
    expect(parseCalculatorParams(toCalculatorParams(petrolCar))).toEqual(
      petrolCar,
    );
  });

  it("reads back what toCalculatorParams wrote for an electric car", () => {
    expect(parseCalculatorParams(toCalculatorParams(electricCar))).toEqual(
      electricCar,
    );
  });

  it("returns null when there are no params at all", () => {
    expect(parseCalculatorParams({})).toBeNull();
  });

  it("returns null when the lot price is missing", () => {
    const params = toCalculatorParams(petrolCar);

    delete params.lot;

    expect(parseCalculatorParams(params)).toBeNull();
  });

  it("returns null for an unknown fuel type", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        fuel: "water",
      }),
    ).toBeNull();
  });

  it("returns null for an unknown vehicle type", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        vehicle: "bus",
      }),
    ).toBeNull();
  });

  it("returns null for an unknown auction", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        auction: "ebay",
      }),
    ).toBeNull();
  });

  it("returns null for a non-numeric lot price", () => {
    expect(
      parseCalculatorParams({ ...toCalculatorParams(petrolCar), lot: "abc" }),
    ).toBeNull();
  });

  it("returns null for a negative lot price", () => {
    expect(
      parseCalculatorParams({ ...toCalculatorParams(petrolCar), lot: "-5" }),
    ).toBeNull();
  });

  it("returns null for a lot price above the allowed maximum", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        lot: "999999",
      }),
    ).toBeNull();
  });

  it("returns null for a year older than the supported depth", () => {
    expect(
      parseCalculatorParams({ ...toCalculatorParams(petrolCar), year: "1800" }),
    ).toBeNull();
  });

  it("returns null for a year in the future", () => {
    const nextYear = String(new Date().getFullYear() + 1);

    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        year: nextYear,
      }),
    ).toBeNull();
  });

  it("returns null for an engine volume beyond the motorcycle limit", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        vehicle: "motorcycle",
        engine: "2501",
      }),
    ).toBeNull();
  });

  it("accepts an engine volume within the motorcycle limit", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        vehicle: "motorcycle",
        engine: "1200",
      }),
    ).not.toBeNull();
  });

  it("returns null for a fractional engine volume", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        engine: "2.5",
      }),
    ).toBeNull();
  });

  it("returns null when a param is repeated in the query string", () => {
    expect(
      parseCalculatorParams({
        ...toCalculatorParams(petrolCar),
        fuel: ["petrol", "diesel"],
      }),
    ).toBeNull();
  });

  it("returns null for an electric car without battery capacity", () => {
    const params = toCalculatorParams(electricCar);

    delete params.battery;

    expect(parseCalculatorParams(params)).toBeNull();
  });
});
