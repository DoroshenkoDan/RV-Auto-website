import { describe, expect, it } from "vitest";

import { estimate } from "./estimate";
import { AUCTION_TYPES, DEFAULT_CALCULATOR_INPUT } from "./options";
import type {
  CalculatorEstimate,
  CalculatorInput,
  EstimateLineKey,
} from "./types";

const petrolCar: CalculatorInput = {
  ...DEFAULT_CALCULATOR_INPUT,
  engineVolume: 2000,
  year: 2019,
  lotPrice: 9400,
};

function totalOf(input: CalculatorInput) {
  const result = estimate(input);

  if (!result) {
    throw new Error("expected an estimate, got null");
  }

  return result;
}

function lineAmount(result: CalculatorEstimate, key: EstimateLineKey) {
  return result.lines.find((line) => line.key === key)?.amount;
}

describe("estimate", () => {
  it("returns null until the year is filled in", () => {
    expect(estimate({ ...petrolCar, year: null })).toBeNull();
  });

  it("returns null until the lot price is filled in", () => {
    expect(estimate({ ...petrolCar, lotPrice: null })).toBeNull();
  });

  it("returns null for a combustion car without engine volume", () => {
    expect(estimate({ ...petrolCar, engineVolume: null })).toBeNull();
  });

  it("returns null for an electric car without battery capacity", () => {
    expect(
      estimate({ ...petrolCar, fuel: "electric", batteryCapacity: null }),
    ).toBeNull();
  });

  it("ignores a missing engine volume when the car is electric", () => {
    const result = estimate({
      ...petrolCar,
      fuel: "electric",
      engineVolume: null,
      batteryCapacity: 60,
    });

    expect(result).not.toBeNull();
  });

  it("adds up to the sum of its lines", () => {
    const result = totalOf(petrolCar);
    const sum = result.lines.reduce((acc, line) => acc + line.amount, 0);

    expect(result.total).toBe(sum);
  });

  it("doubles the petrol excise rate above 3000 cc", () => {
    const under = totalOf({ ...petrolCar, engineVolume: 3000 });
    const over = totalOf({ ...petrolCar, engineVolume: 3001 });

    expect(over.excise / under.excise).toBeCloseTo(2, 2);
  });

  it("doubles the diesel excise rate above 3500 cc", () => {
    const diesel = { ...petrolCar, fuel: "diesel" } as const;
    const under = totalOf({ ...diesel, engineVolume: 3500 });
    const over = totalOf({ ...diesel, engineVolume: 3501 });

    expect(over.excise / under.excise).toBeCloseTo(2, 2);
  });

  it("charges no excise on a motorcycle at or below 800 cc", () => {
    const result = totalOf({
      ...petrolCar,
      vehicle: "motorcycle",
      engineVolume: 800,
    });

    expect(result.excise).toBe(0);
  });

  it("charges excise on a motorcycle above 800 cc", () => {
    const result = totalOf({
      ...petrolCar,
      vehicle: "motorcycle",
      engineVolume: 801,
    });

    expect(result.excise).toBeGreaterThan(0);
  });

  it("caps the excise age coefficient at 15 years", () => {
    const currentYear = new Date().getFullYear();
    const atCap = totalOf({ ...petrolCar, year: currentYear - 15 });
    const pastCap = totalOf({ ...petrolCar, year: currentYear - 30 });

    expect(pastCap.excise).toBe(atCap.excise);
  });

  it("picks the auction fee tier that matches the lot price", () => {
    const cheap = totalOf({ ...petrolCar, lotPrice: 500 });
    const dear = totalOf({ ...petrolCar, lotPrice: 501 });

    expect(lineAmount(cheap, "auctionFee")).toBe(150);
    expect(lineAmount(dear, "auctionFee")).toBe(225);
  });

  it("charges a higher auction fee on iaai than on copart", () => {
    const copart = totalOf({ ...petrolCar, auction: "copart" });
    const iaai = totalOf({ ...petrolCar, auction: "iaai" });

    expect(iaai.total).toBeGreaterThan(copart.total);
  });

  it("charges iaa canada a capped percentage plus service fees", () => {
    const cheap = totalOf({
      ...petrolCar,
      auction: "iaaCanada",
      lotPrice: 2000,
    });
    const dear = totalOf({
      ...petrolCar,
      auction: "iaaCanada",
      lotPrice: 9400,
    });

    expect(lineAmount(cheap, "auctionFee")).toBe(340);
    expect(lineAmount(dear, "auctionFee")).toBe(640);
  });

  it("omits the auction fee line for marketplaces", () => {
    const result = totalOf({ ...petrolCar, auction: "encar" });

    expect(lineAmount(result, "auctionFee")).toBeUndefined();
  });

  it("charges no import duty on cars from the eu", () => {
    const result = totalOf({ ...petrolCar, auction: "bca" });

    expect(result.duty).toBe(0);
  });

  it("keeps the import duty for cars from outside the eu", () => {
    const result = totalOf({ ...petrolCar, auction: "finn" });

    expect(result.duty).toBeGreaterThan(0);
  });

  it("skips inland delivery for trucked european cars", () => {
    const result = totalOf({ ...petrolCar, auction: "auto1" });

    expect(lineAmount(result, "inlandDelivery")).toBeUndefined();
    expect(lineAmount(result, "freight")).toBeGreaterThan(0);
  });

  it("estimates every listed auction", () => {
    for (const auction of AUCTION_TYPES) {
      expect(estimate({ ...petrolCar, auction })).not.toBeNull();
    }
  });
});
