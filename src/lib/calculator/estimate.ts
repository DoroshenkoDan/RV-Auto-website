import { getAuctionRegion } from "./options";
import {
  AUCTION_FEES,
  COMPANY_FEE_USD,
  DUTY_FREE_REGIONS,
  EUR_TO_USD,
  EXCISE_AGE_LIMIT,
  EXCISE_ELECTRIC_EUR_PER_KWH,
  EXCISE_HYBRID_EUR,
  EXCISE_MOTORCYCLE_EUR_PER_CC,
  EXCISE_MOTORCYCLE_FREE_VOLUME,
  EXCISE_TIERS,
  FREIGHT_USD,
  IMPORT_DUTY_RATE,
  INLAND_DELIVERY_USD,
  VAT_RATE,
} from "./rates";
import type { AuctionType, CalculatorEstimate, CalculatorInput } from "./types";

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
  const age = new Date().getFullYear() - year;

  return Math.min(Math.max(age, 1), EXCISE_AGE_LIMIT);
}

function getExciseEur(input: CalculatorInput) {
  const { fuel, vehicle, engineVolume, batteryCapacity, year } = input;

  if (fuel === "electric") {
    return (batteryCapacity ?? 0) * EXCISE_ELECTRIC_EUR_PER_KWH;
  }

  if (engineVolume === null || year === null) {
    return 0;
  }

  if (vehicle === "motorcycle") {
    return engineVolume > EXCISE_MOTORCYCLE_FREE_VOLUME
      ? engineVolume * EXCISE_MOTORCYCLE_EUR_PER_CC
      : 0;
  }

  if (fuel === "hybrid") {
    return EXCISE_HYBRID_EUR;
  }

  const tier = EXCISE_TIERS[fuel].find(
    ({ maxVolume }) => maxVolume === undefined || engineVolume <= maxVolume,
  );

  if (!tier) {
    return 0;
  }

  return (tier.eurPerLitre * engineVolume * getAgeCoefficient(year)) / 1000;
}

export function estimate(input: CalculatorInput): CalculatorEstimate | null {
  const {
    fuel,
    vehicle,
    auction,
    engineVolume,
    batteryCapacity,
    year,
    lotPrice,
  } = input;

  if (year === null || lotPrice === null) {
    return null;
  }

  if (fuel === "electric" ? batteryCapacity === null : engineVolume === null) {
    return null;
  }

  const region = getAuctionRegion(auction);
  const auctionFee = getAuctionFee(auction, lotPrice);
  const inlandDelivery = INLAND_DELIVERY_USD[region][vehicle];
  const freight = FREIGHT_USD[region][vehicle];

  const customsValue = lotPrice + auctionFee + inlandDelivery + freight;

  const dutyRate = DUTY_FREE_REGIONS.includes(region) ? 0 : IMPORT_DUTY_RATE;
  const duty = customsValue * dutyRate;
  const excise = getExciseEur(input) * EUR_TO_USD;
  const vat = (customsValue + duty + excise) * VAT_RATE;

  const lines = [
    { key: "lotPrice", amount: lotPrice },
    { key: "auctionFee", amount: auctionFee },
    { key: "inlandDelivery", amount: inlandDelivery },
    { key: "freight", amount: freight },
    { key: "customs", amount: Math.round(duty + excise) },
    { key: "vat", amount: Math.round(vat) },
    { key: "companyFee", amount: COMPANY_FEE_USD },
  ] as const;

  return {
    lines: lines.filter((line) => line.amount > 0),
    total: lines.reduce((sum, line) => sum + line.amount, 0),
    customsValue: Math.round(customsValue),
    duty: Math.round(duty),
    excise: Math.round(excise),
  };
}
