import {
  AUCTION_TYPES,
  BATTERY_CAPACITY_LIMITS,
  ENGINE_VOLUME_LIMITS,
  FUEL_TYPES,
  LOT_PRICE_LIMITS,
  VEHICLE_TYPES,
  getYearOptions,
} from "./options";
import type { CalculatorInput } from "./types";

type ParamValue = string | string[] | undefined;

export type CalculatorParams = Record<string, ParamValue>;

function single(value: ParamValue) {
  return typeof value === "string" ? value : null;
}

function oneOf<T extends string>(value: ParamValue, allowed: readonly T[]) {
  const raw = single(value);

  return raw !== null && (allowed as readonly string[]).includes(raw)
    ? (raw as T)
    : null;
}

function integer(value: ParamValue, min: number, max: number) {
  const raw = single(value);

  if (raw === null || !/^\d+$/.test(raw)) {
    return null;
  }

  const parsed = Number(raw);

  return parsed >= min && parsed <= max ? parsed : null;
}

export function toCalculatorParams(input: CalculatorInput) {
  const params: Record<string, string> = {
    fuel: input.fuel,
    vehicle: input.vehicle,
    auction: input.auction,
  };

  if (input.year !== null) {
    params.year = String(input.year);
  }

  if (input.lotPrice !== null) {
    params.lot = String(input.lotPrice);
  }

  if (input.fuel === "electric") {
    if (input.batteryCapacity !== null) {
      params.battery = String(input.batteryCapacity);
    }
  } else if (input.engineVolume !== null) {
    params.engine = String(input.engineVolume);
  }

  return params;
}

export function parseCalculatorParams(
  params: CalculatorParams,
): CalculatorInput | null {
  const fuel = oneOf(params.fuel, FUEL_TYPES);
  const vehicle = oneOf(params.vehicle, VEHICLE_TYPES);
  const auction = oneOf(params.auction, AUCTION_TYPES);

  if (fuel === null || vehicle === null || auction === null) {
    return null;
  }

  const years = getYearOptions();
  const year = integer(params.year, years[years.length - 1], years[0]);
  const lotPrice = integer(
    params.lot,
    LOT_PRICE_LIMITS.min,
    LOT_PRICE_LIMITS.max,
  );

  if (year === null || lotPrice === null) {
    return null;
  }

  if (fuel === "electric") {
    const batteryCapacity = integer(
      params.battery,
      BATTERY_CAPACITY_LIMITS.min,
      BATTERY_CAPACITY_LIMITS.max,
    );

    if (batteryCapacity === null) {
      return null;
    }

    return {
      fuel,
      vehicle,
      auction,
      engineVolume: null,
      batteryCapacity,
      year,
      lotPrice,
    };
  }

  const limits = ENGINE_VOLUME_LIMITS[vehicle];
  const engineVolume = integer(params.engine, limits.min, limits.max);

  if (engineVolume === null) {
    return null;
  }

  return {
    fuel,
    vehicle,
    auction,
    engineVolume,
    batteryCapacity: null,
    year,
    lotPrice,
  };
}
