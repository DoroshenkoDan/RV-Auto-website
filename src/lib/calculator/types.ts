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

export type ExchangeRates = {
  usd: number;
  eur: number;
};

export type CalculatorInput = {
  fuel: FuelType;
  vehicle: VehicleType;
  auction: AuctionType;
  state: string | null;
  city: string | null;
  engineVolume: number | null;
  batteryCapacity: number | null;
  year: number | null;
  lotPrice: number | null;
};

export type EstimateLineKey =
  | "lotPrice"
  | "auctionFee"
  | "service"
  | "inlandDelivery"
  | "freight"
  | "klaipedaParking"
  | "broker"
  | "klaipedaTruck"
  | "customs"
  | "ukraineTruck"
  | "certification";

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
  vat: number;
};
