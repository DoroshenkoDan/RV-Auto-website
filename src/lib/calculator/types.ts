export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type VehicleType = "car" | "suv" | "pickup" | "motorcycle";

export type AuctionType =
  | "copart"
  | "iaai"
  | "manheim"
  | "iaaCanada"
  | "auto1"
  | "bca"
  | "exLeasing"
  | "finn"
  | "encar"
  | "kbChaChaCha"
  | "che168";

export type AuctionRegion =
  "usa" | "canada" | "europe" | "norway" | "korea" | "china";

export type CalculatorInput = {
  fuel: FuelType;
  vehicle: VehicleType;
  auction: AuctionType;
  engineVolume: number | null;
  batteryCapacity: number | null;
  year: number | null;
  lotPrice: number | null;
};

export type EstimateLineKey =
  | "lotPrice"
  | "auctionFee"
  | "inlandDelivery"
  | "freight"
  | "customs"
  | "vat"
  | "companyFee";

export type EstimateLine = {
  key: EstimateLineKey;
  amount: number;
};

export type CalculatorEstimate = {
  lines: EstimateLine[];
  total: number;
  customsValue: number;
  duty: number;
  excise: number;
};
