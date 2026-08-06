export type FuelType = "petrol" | "diesel" | "hybrid" | "electric"

export type VehicleType = "car" | "suv" | "pickup" | "motorcycle"

export type AuctionType = "copart" | "iaai"

export type CalculatorInput = {
  fuel: FuelType
  vehicle: VehicleType
  auction: AuctionType
  engineVolume: number | null
  batteryCapacity: number | null
  year: number | null
  lotPrice: number | null
}

export type EstimateLineKey =
  | "lotPrice"
  | "auctionFee"
  | "usDelivery"
  | "oceanFreight"
  | "customs"
  | "vat"
  | "companyFee"

export type EstimateLine = {
  key: EstimateLineKey
  amount: number
}

export type CalculatorEstimate = {
  lines: EstimateLine[]
  total: number
  customsValue: number
  duty: number
  excise: number
}
