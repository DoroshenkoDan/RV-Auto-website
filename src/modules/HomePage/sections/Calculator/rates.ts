import type { AuctionType, VehicleType } from "./types";

export type FeeTier = { maxPrice?: number; fee: number };

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

export const AUCTION_FEE_TIERS: Record<AuctionType, FeeTier[]> = {
  copart: [
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
  iaai: [
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
};

export const US_DELIVERY_USD: Record<VehicleType, number> = {
  car: 420,
  suv: 480,
  pickup: 550,
  motorcycle: 300,
};

export const OCEAN_FREIGHT_USD: Record<VehicleType, number> = {
  car: 1150,
  suv: 1250,
  pickup: 1400,
  motorcycle: 700,
};

export const COMPANY_FEE_USD = 200;
