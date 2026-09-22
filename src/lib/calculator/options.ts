import type {
  AuctionRegion,
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

export const AUCTION_GROUPS: {
  region: AuctionRegion;
  auctions: AuctionType[];
}[] = [
  { region: "usa", auctions: ["copart", "iaai", "manheim"] },
  { region: "canada", auctions: ["iaaCanada"] },
  { region: "europe", auctions: ["auto1", "bca", "exLeasing"] },
  { region: "norway", auctions: ["finn"] },
  { region: "korea", auctions: ["encar", "kbChaChaCha"] },
  { region: "china", auctions: ["che168"] },
];

export const AUCTION_TYPES: AuctionType[] = AUCTION_GROUPS.flatMap(
  ({ auctions }) => auctions,
);

export function getAuctionRegion(auction: AuctionType): AuctionRegion {
  const group = AUCTION_GROUPS.find(({ auctions }) =>
    auctions.includes(auction),
  );

  if (!group) {
    throw new Error(`Unknown auction: ${auction}`);
  }

  return group.region;
}

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
