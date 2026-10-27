import { describe, expect, it } from "vitest";

import pricing from "./data/pricing.json";
import usLocations from "./data/us-locations.json";
import { estimate } from "./estimate";
import { AUCTION_TYPES, DEFAULT_CALCULATOR_INPUT } from "./options";
import { FALLBACK_EXCHANGE_RATES as rates } from "./rates";
import type {
  CalculatorEstimate,
  CalculatorInput,
  EstimateLineKey,
  ExchangeRates,
} from "./types";

const petrolCar: CalculatorInput = {
  ...DEFAULT_CALCULATOR_INPUT,
  engineVolume: 2000,
  year: 2019,
  lotPrice: 9400,
};

function totalOf(input: CalculatorInput, exchangeRates: ExchangeRates = rates) {
  const result = estimate(input, exchangeRates);

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
    expect(estimate({ ...petrolCar, year: null }, rates)).toBeNull();
  });

  it("returns null until the lot price is filled in", () => {
    expect(estimate({ ...petrolCar, lotPrice: null }, rates)).toBeNull();
  });

  it("returns null for a combustion car without engine volume", () => {
    expect(estimate({ ...petrolCar, engineVolume: null }, rates)).toBeNull();
  });

  it("returns null for an electric car without battery capacity", () => {
    expect(
      estimate(
        { ...petrolCar, fuel: "electric", batteryCapacity: null },
        rates,
      ),
    ).toBeNull();
  });

  it("ignores a missing engine volume when the car is electric", () => {
    const result = estimate(
      {
        ...petrolCar,
        fuel: "electric",
        engineVolume: null,
        batteryCapacity: 60,
      },
      rates,
    );

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

  it("converts the excise from euro with the eur to usd cross rate", () => {
    const parity = totalOf(petrolCar, { usd: 40, eur: 40 });
    const strongEuro = totalOf(petrolCar, { usd: 40, eur: 50 });

    expect(strongEuro.excise / parity.excise).toBeCloseTo(1.25, 2);
  });

  it("caps the excise age coefficient at 15 years", () => {
    const currentYear = new Date().getFullYear();
    const atCap = totalOf({ ...petrolCar, year: currentYear - 15 });
    const pastCap = totalOf({ ...petrolCar, year: currentYear - 30 });

    expect(pastCap.excise).toBe(atCap.excise);
  });

  it("picks the auction fee tier that matches the lot price", () => {
    const manheim = { ...petrolCar, auction: "manheim" } as const;
    const cheap = totalOf({ ...manheim, lotPrice: 5000 });
    const dear = totalOf({ ...manheim, lotPrice: 5001 });

    expect(lineAmount(cheap, "auctionFee")).toBe(400);
    expect(lineAmount(dear, "auctionFee")).toBe(550);
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
      expect(estimate({ ...petrolCar, auction }, rates)).not.toBeNull();
    }
  });
});

describe("estimate for us auctions", () => {
  const ocalaCar: CalculatorInput = {
    ...petrolCar,
    auction: "copart",
    engineVolume: 3000,
    year: new Date().getFullYear() - 7,
    lotPrice: 8900,
    state: "FL",
    city: "Ocala",
  };

  function medianCarPrice(cities: Record<string, { car: number }>[]) {
    const prices = cities
      .flatMap((stateCities) => Object.values(stateCities))
      .map(({ car }) => car)
      .sort((a, b) => a - b);
    const middle = Math.floor(prices.length / 2);

    return prices.length % 2
      ? prices[middle]
      : (prices[middle - 1] + prices[middle]) / 2;
  }

  function portDeliveryFor(guestPrice: number, lotTotal: number) {
    return Math.round(
      guestPrice -
        pricing.caucasusDiscountUsd.car +
        pricing.portDeliveryMarkupUsd +
        pricing.forwardingFeeUsd +
        Math.ceil(lotTotal * pricing.insuranceRate),
    );
  }

  it("prices a copart lot by the chosen city", () => {
    const result = totalOf(ocalaCar);

    expect(result.lines).toEqual([
      { key: "lotPrice", amount: 8900 },
      { key: "auctionFee", amount: 1165 },
      { key: "inlandDelivery", amount: 3079 },
      { key: "customs", amount: 2341 },
      { key: "vat", amount: 2801 },
    ]);
    expect(result.total).toBe(18286);
  });

  it("bases the customs value on the lot, fees and a fixed delivery", () => {
    const result = totalOf(ocalaCar);

    expect(result.customsValue).toBe(8900 + 1165 + 1600);
  });

  it("uses a 600 dollar customs delivery base for motorcycles", () => {
    const result = totalOf({
      ...ocalaCar,
      vehicle: "motorcycle",
      engineVolume: 900,
    });

    expect(result.customsValue).toBe(8900 + 1165 + 600);
  });

  it("adds the pickup forwarding surcharge in euro", () => {
    const result = totalOf({ ...ocalaCar, vehicle: "pickup" });

    expect(lineAmount(result, "inlandDelivery")).toBe(4095);
  });

  it("uses the state median when no city is chosen", () => {
    const result = totalOf({ ...ocalaCar, city: null });

    expect(lineAmount(result, "inlandDelivery")).toBe(
      portDeliveryFor(medianCarPrice([usLocations.copart.FL]), 10065),
    );
  });

  it("falls back to the state median for an unknown city", () => {
    const unknown = totalOf({ ...ocalaCar, city: "Atlantis" });
    const stateOnly = totalOf({ ...ocalaCar, city: null });

    expect(unknown.lines).toEqual(stateOnly.lines);
  });

  it("uses the auction median when no state is chosen", () => {
    const result = totalOf({ ...ocalaCar, state: null, city: null });

    expect(lineAmount(result, "inlandDelivery")).toBe(
      portDeliveryFor(medianCarPrice(Object.values(usLocations.copart)), 10065),
    );
  });

  it("uses the iaai locations and fees for iaai lots", () => {
    const result = totalOf({
      ...ocalaCar,
      auction: "iaai",
      state: "CA",
      city: "Los Angeles",
    });

    expect(lineAmount(result, "auctionFee")).toBe(1130);
    expect(lineAmount(result, "inlandDelivery")).toBe(
      portDeliveryFor(usLocations.iaai.CA["Los Angeles"].car, 10030),
    );
  });

  it("uses the special fee table without the extra fee in special states", () => {
    const result = totalOf({ ...ocalaCar, state: "AL", city: null });

    expect(lineAmount(result, "auctionFee")).toBe(1235);
  });

  it("charges a percentage bid fee on expensive lots", () => {
    const result = totalOf({ ...ocalaCar, lotPrice: 20000 });

    expect(lineAmount(result, "auctionFee")).toBe(1545);
  });

  it("omits the separate freight line", () => {
    const result = totalOf(ocalaCar);

    expect(lineAmount(result, "freight")).toBeUndefined();
  });

  it("prices a manheim lot by its location with the manheim fee tiers", () => {
    const result = totalOf({
      ...ocalaCar,
      auction: "manheim",
      state: "FL",
      city: "Manheim Tampa",
    });

    expect(lineAmount(result, "auctionFee")).toBe(550);
    expect(lineAmount(result, "inlandDelivery")).toBe(
      portDeliveryFor(1426, 8900 + 550),
    );
    expect(result.customsValue).toBe(8900 + 550 + 1600);
  });
});
