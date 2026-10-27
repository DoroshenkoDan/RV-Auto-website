import usAuctionFees from "./data/us-auction-fees.json";
import usLocations from "./data/us-locations.json";
import type { AuctionType, VehicleType } from "./types";

export const US_AUCTIONS = ["copart", "iaai", "manheim"] as const;

export type UsAuction = (typeof US_AUCTIONS)[number];

type FeeTier = {
  min: number;
  max: number | null;
  fee?: number;
  percent?: number;
};

type LocationPrices = {
  port: string | null;
  car: number;
  pickup?: number;
  motorcycle?: number;
};

type Locations = Record<string, Record<string, LocationPrices>>;

const LOCATIONS = usLocations as Record<UsAuction, Locations>;

export function isUsAuction(auction: AuctionType): auction is UsAuction {
  return (US_AUCTIONS as readonly AuctionType[]).includes(auction);
}

export function getUsStates(auction: UsAuction) {
  return Object.keys(LOCATIONS[auction]);
}

export function getUsCities(auction: UsAuction, state: string) {
  return Object.keys(LOCATIONS[auction][state] ?? {});
}

export function resolveUsLocation(
  auction: AuctionType,
  state: string | null,
  city: string | null,
) {
  if (!isUsAuction(auction) || state === null || !LOCATIONS[auction][state]) {
    return { state: null, city: null };
  }

  return {
    state,
    city: city !== null && LOCATIONS[auction][state][city] ? city : null,
  };
}

function getTierFee(tiers: FeeTier[], lotPrice: number) {
  const tier = tiers.find(
    ({ min, max }) => lotPrice >= min && (max === null || lotPrice <= max),
  );

  if (!tier) {
    return 0;
  }

  return tier.percent !== undefined
    ? (lotPrice * tier.percent) / 100
    : (tier.fee ?? 0);
}

export function getUsAuctionFee(
  auction: UsAuction,
  lotPrice: number,
  state: string | null,
) {
  if (!(auction in usAuctionFees)) {
    return null;
  }

  const fees = usAuctionFees[auction as keyof typeof usAuctionFees];
  const special = state !== null && fees.specialStates.includes(state);
  const table = special ? fees.special : fees.standard;

  return Math.floor(
    fees.fixed +
      (special ? 0 : fees.extra) +
      getTierFee(table.bid, lotPrice) +
      getTierFee(table.online, lotPrice),
  );
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function getPrice(prices: LocationPrices, vehicle: VehicleType) {
  if (vehicle === "pickup") return prices.pickup ?? prices.car;
  if (vehicle === "motorcycle") return prices.motorcycle ?? prices.car;

  return prices.car;
}

export function getUsLocationPrice(
  auction: UsAuction,
  vehicle: VehicleType,
  state: string | null,
  city: string | null,
) {
  const locations = LOCATIONS[auction];
  const stateCities = state === null ? undefined : locations[state];
  const cityPrices = city === null ? undefined : stateCities?.[city];

  if (cityPrices) {
    return getPrice(cityPrices, vehicle);
  }

  const candidates = stateCities
    ? Object.values(stateCities)
    : Object.values(locations).flatMap((cities) => Object.values(cities));

  return median(candidates.map((prices) => getPrice(prices, vehicle)));
}
