import type { AuctionRegion, AuctionType, VehicleType } from "./types";

export type FeeTier = { maxPrice?: number; fee: number };

export type FeeRule =
  | { kind: "tiers"; tiers: FeeTier[] }
  | { kind: "percent"; rate: number; max: number; extra: number }
  | { kind: "flat"; fee: number };

export type ExciseTier = { maxVolume?: number; eurPerLitre: number };

export const EUR_TO_USD = 1.08;

export const IMPORT_DUTY_RATE = 0.1;

export const VAT_RATE = 0.2;

export const EXCISE_AGE_LIMIT = 15;

export const EXCISE_TIERS: Record<"petrol" | "diesel", ExciseTier[]> = {
  petrol: [{ maxVolume: 3000, eurPerLitre: 50 }, { eurPerLitre: 100 }],
  diesel: [{ maxVolume: 3500, eurPerLitre: 75 }, { eurPerLitre: 150 }],
};

export const EXCISE_HYBRID_EUR = 100;

export const EXCISE_ELECTRIC_EUR_PER_KWH = 1;

export const EXCISE_MOTORCYCLE_EUR_PER_CC = 0.2;

export const EXCISE_MOTORCYCLE_FREE_VOLUME = 800;

export const AUCTION_FEES: Record<AuctionType, FeeRule> = {
  copart: {
    kind: "tiers",
    tiers: [
      { maxPrice: 500, fee: 150 },
      { maxPrice: 1000, fee: 225 },
      { maxPrice: 2000, fee: 300 },
      { maxPrice: 4000, fee: 400 },
      { maxPrice: 6000, fee: 510 },
      { maxPrice: 8000, fee: 610 },
      { maxPrice: 10000, fee: 700 },
      { maxPrice: 15000, fee: 800 },
      { fee: 900 },
    ],
  },
  iaai: {
    kind: "tiers",
    tiers: [
      { maxPrice: 500, fee: 160 },
      { maxPrice: 1000, fee: 240 },
      { maxPrice: 2000, fee: 320 },
      { maxPrice: 4000, fee: 425 },
      { maxPrice: 6000, fee: 535 },
      { maxPrice: 8000, fee: 640 },
      { maxPrice: 10000, fee: 730 },
      { maxPrice: 15000, fee: 830 },
      { fee: 930 },
    ],
  },
  // TODO: verify Manheim buyer fees, they depend on the account tier and location
  manheim: {
    kind: "tiers",
    tiers: [
      { maxPrice: 5000, fee: 400 },
      { maxPrice: 10000, fee: 550 },
      { fee: 700 },
    ],
  },
  iaaCanada: { kind: "percent", rate: 0.1, max: 500, extra: 140 },
  // TODO: verify the BCA EU buyer fee (EUR 450 per vehicle)
  bca: { kind: "flat", fee: 486 },
  auto1: { kind: "flat", fee: 0 },
  exLeasing: { kind: "flat", fee: 0 },
  finn: { kind: "flat", fee: 0 },
  encar: { kind: "flat", fee: 0 },
  kbChaChaCha: { kind: "flat", fee: 0 },
  che168: { kind: "flat", fee: 0 },
};

export const DUTY_FREE_REGIONS: readonly AuctionRegion[] = ["europe"];

// TODO: verify delivery rates outside the USA, they are market estimates
export const INLAND_DELIVERY_USD: Record<
  AuctionRegion,
  Record<VehicleType, number>
> = {
  usa: { car: 420, suv: 480, pickup: 550, motorcycle: 300 },
  canada: { car: 420, suv: 480, pickup: 550, motorcycle: 300 },
  europe: { car: 0, suv: 0, pickup: 0, motorcycle: 0 },
  norway: { car: 0, suv: 0, pickup: 0, motorcycle: 0 },
  korea: { car: 200, suv: 230, pickup: 260, motorcycle: 150 },
  china: { car: 250, suv: 280, pickup: 320, motorcycle: 180 },
};

export const FREIGHT_USD: Record<AuctionRegion, Record<VehicleType, number>> = {
  usa: { car: 1150, suv: 1250, pickup: 1400, motorcycle: 700 },
  canada: { car: 1150, suv: 1250, pickup: 1400, motorcycle: 700 },
  europe: { car: 900, suv: 1000, pickup: 1150, motorcycle: 450 },
  norway: { car: 1400, suv: 1550, pickup: 1750, motorcycle: 700 },
  korea: { car: 1400, suv: 1550, pickup: 1750, motorcycle: 800 },
  china: { car: 2900, suv: 3200, pickup: 3500, motorcycle: 1200 },
};

export const COMPANY_FEE_USD = 200;
