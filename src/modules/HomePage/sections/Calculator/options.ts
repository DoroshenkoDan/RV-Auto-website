import type {
  AuctionType,
  CalculatorInput,
  FuelType,
  VehicleType,
} from "./types";

export const FUEL_TYPES: FuelType[] = [
  "petrol",
  "diesel",
  "hybrid",
  "electric",
];

export const VEHICLE_TYPES: VehicleType[] = [
  "car",
  "suv",
  "pickup",
  "motorcycle",
];

export const AUCTION_TYPES: AuctionType[] = ["copart", "iaai"];

export const ENGINE_VOLUME_LIMITS: Record<
  VehicleType,
  { min: number; max: number }
> = {
  car: { min: 600, max: 8000 },
  suv: { min: 600, max: 8000 },
  pickup: { min: 600, max: 8000 },
  motorcycle: { min: 50, max: 2500 },
};

export const BATTERY_CAPACITY_LIMITS = { min: 10, max: 250 };

export const LOT_PRICE_LIMITS = { min: 100, max: 500000 };

export const YEAR_DEPTH = 30;

export const DEFAULT_CALCULATOR_INPUT: CalculatorInput = {
  fuel: "petrol",
  vehicle: "car",
  auction: "copart",
  engineVolume: null,
  batteryCapacity: null,
  year: null,
  lotPrice: null,
};

export function getYearOptions() {
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: YEAR_DEPTH + 1 },
    (_, index) => currentYear - index,
  );
}
