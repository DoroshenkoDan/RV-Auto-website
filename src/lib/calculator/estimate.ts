import pricing from "./data/pricing.json";
import { getAuctionRegion } from "./options";
import {
  AUCTION_FEES,
  DUTY_FREE_REGIONS,
  EXCISE_AGE_LIMIT,
  EXCISE_MOTORCYCLE_EUR_PER_CC,
  EXCISE_MOTORCYCLE_FREE_VOLUME,
  EXCISE_TIERS,
  FREIGHT_USD,
  IMPORT_DUTY_RATE,
  INLAND_DELIVERY_USD,
  VAT_RATE,
} from "./rates";
import type {
  AuctionType,
  CalculatorEstimate,
  CalculatorInput,
  ExchangeRates,
  VehicleType,
} from "./types";
import { getUsAuctionFee, getUsLocationPrice, isUsAuction } from "./usAuctions";

function getAuctionFee(auction: AuctionType, lotPrice: number) {
  const rule = AUCTION_FEES[auction];

  if (rule.kind === "flat") {
    return rule.fee;
  }

  if (rule.kind === "percent") {
    return Math.round(Math.min(lotPrice * rule.rate, rule.max) + rule.extra);
  }

  const tier = rule.tiers.find(
    ({ maxPrice }) => maxPrice === undefined || lotPrice <= maxPrice,
  );

  return tier?.fee ?? 0;
}

function getAgeCoefficient(year: number) {
  const age = new Date().getFullYear() - year - 1;

  return Math.min(Math.max(age, 1), EXCISE_AGE_LIMIT);
}

function getExciseEur(input: CalculatorInput) {
  const { fuel, vehicle, engineVolume, year } = input;

  if (fuel === "electric" || engineVolume === null || year === null) {
    return 0;
  }

  if (vehicle === "motorcycle") {
    return engineVolume > EXCISE_MOTORCYCLE_FREE_VOLUME
      ? engineVolume * EXCISE_MOTORCYCLE_EUR_PER_CC
      : 0;
  }

  const tier = EXCISE_TIERS[fuel === "diesel" ? "diesel" : "petrol"].find(
    ({ maxVolume }) => maxVolume === undefined || engineVolume <= maxVolume,
  );

  if (!tier) {
    return 0;
  }

  return (tier.eurPerLitre * engineVolume * getAgeCoefficient(year)) / 1000;
}

const DISCOUNT_EXCEPTIONS: Record<
  string,
  Partial<Record<VehicleType, number>>
> = pricing.caucasusDiscountExceptionsUsd;

function getCaucasusDiscount({
  auction,
  vehicle,
  state,
  city,
}: CalculatorInput) {
  const exception = DISCOUNT_EXCEPTIONS[`${auction}:${state}:${city}`];

  return exception?.[vehicle] ?? pricing.caucasusDiscountUsd[vehicle];
}

function getShipping(input: CalculatorInput, lotPrice: number) {
  const { auction, vehicle, state, city } = input;

  if (!isUsAuction(auction)) {
    const region = getAuctionRegion(auction);
    const auctionFee = getAuctionFee(auction, lotPrice);
    const inlandDelivery = INLAND_DELIVERY_USD[region][vehicle];
    const freight = FREIGHT_USD[region][vehicle];

    return {
      auctionFee,
      inlandDelivery,
      freight,
      customsValue: lotPrice + auctionFee + inlandDelivery + freight,
    };
  }

  const auctionFee =
    getUsAuctionFee(auction, lotPrice, state) ??
    getAuctionFee(auction, lotPrice);
  const lotTotal = lotPrice + auctionFee;
  const portPrice =
    getUsLocationPrice(auction, vehicle, state, city) -
    getCaucasusDiscount(input);
  const insurance = Math.ceil(lotTotal * pricing.insuranceRate);

  return {
    auctionFee,
    inlandDelivery: Math.round(
      portPrice + pricing.portDeliveryMarkupUsd + insurance,
    ),
    freight: 0,
    customsValue: lotTotal + pricing.customsDeliveryBaseUsd[vehicle],
  };
}

export function estimate(
  input: CalculatorInput,
  rates: ExchangeRates,
): CalculatorEstimate | null {
  const { fuel, auction, engineVolume, batteryCapacity, year, lotPrice } =
    input;

  if (year === null || lotPrice === null) {
    return null;
  }

  if (fuel === "electric" ? batteryCapacity === null : engineVolume === null) {
    return null;
  }

  const region = getAuctionRegion(auction);
  const shipping = getShipping(input, lotPrice);
  const { auctionFee, inlandDelivery, freight } = shipping;
  const electric = fuel === "electric";
  const customsValue = electric ? lotPrice + auctionFee : shipping.customsValue;

  const dutyRate =
    electric || DUTY_FREE_REGIONS.includes(region) ? 0 : IMPORT_DUTY_RATE;
  const duty = customsValue * dutyRate;
  const excise = (getExciseEur(input) * rates.eur) / rates.usd;
  const vat = (customsValue + duty + excise) * VAT_RATE;
  const us = isUsAuction(auction);
  const kyiv = us ? pricing.kyivDeliveryUsd : null;

  const lines = [
    { key: "lotPrice", amount: lotPrice },
    { key: "auctionFee", amount: auctionFee },
    { key: "service", amount: us ? pricing.serviceFeeUsd : 0 },
    { key: "inlandDelivery", amount: inlandDelivery },
    { key: "freight", amount: freight },
    { key: "klaipedaParking", amount: kyiv?.klaipedaParking ?? 0 },
    { key: "broker", amount: kyiv?.broker ?? 0 },
    { key: "klaipedaTruck", amount: kyiv?.klaipedaTruck ?? 0 },
    { key: "customs", amount: Math.round(duty + excise + vat) },
    { key: "ukraineTruck", amount: kyiv?.ukraineTruck ?? 0 },
    { key: "certification", amount: kyiv?.certification ?? 0 },
  ] as const;

  return {
    lines: lines.filter((line) => line.amount > 0),
    total: lines.reduce((sum, line) => sum + line.amount, 0),
    customsValue: Math.round(customsValue),
    duty: Math.round(duty),
    excise: Math.round(excise),
    vat: Math.round(vat),
  };
}
