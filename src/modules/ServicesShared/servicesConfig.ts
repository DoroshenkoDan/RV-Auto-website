export type Transport = "sea" | "truck";

export type SellStep = { id: string; href?: string };

export type PlatformLogo = { src: string; width: number; height: number };

const LOGO_DIR = "/images/Services/Platforms";

const IAA_LOGO: PlatformLogo = {
  src: `${LOGO_DIR}/Iaa.svg`,
  width: 73,
  height: 53,
};

export const PLATFORMS = {
  che168: {
    logo: { src: `${LOGO_DIR}/Che168.png`, width: 233, height: 92 },
  },
  encar: {
    logo: { src: `${LOGO_DIR}/Encar.png`, width: 700, height: 262 },
  },
  kbChaChaCha: {
    logo: { src: `${LOGO_DIR}/KbChaChaCha.png`, width: 118, height: 50 },
  },
  copart: {
    logo: { src: `${LOGO_DIR}/Copart.svg`, width: 140, height: 53 },
  },
  iaai: { logo: IAA_LOGO },
  iaaCanada: { logo: IAA_LOGO },
  manheim: {
    logo: { src: `${LOGO_DIR}/Manheim.svg`, width: 167, height: 167 },
  },
  auto1: {
    logo: { src: `${LOGO_DIR}/Auto1.svg`, width: 138, height: 28 },
  },
  bca: {
    logo: { src: `${LOGO_DIR}/Bca.png`, width: 119, height: 40 },
  },
  exLeasing: {},
  finn: {
    logo: { src: `${LOGO_DIR}/Finn.svg`, width: 184, height: 64 },
  },
} as const satisfies Record<string, { logo?: PlatformLogo }>;

export type PlatformId = keyof typeof PLATFORMS;

type ImportCountryConfig = {
  platforms: readonly PlatformId[];
  transport: Transport;
  features: readonly string[];
  faq: readonly string[];
};

export const IMPORT_COUNTRY_FACTS = ["term", "platforms", "turnkey"] as const;

export const IMPORT_COUNTRIES = {
  china: {
    platforms: ["che168"],
    transport: "sea",
    features: ["electric", "newCars", "price"],
    faq: ["term", "quality", "charging", "documents"],
  },
  korea: {
    platforms: ["encar", "kbChaChaCha"],
    transport: "sea",
    features: ["service", "inspection", "condition"],
    faq: ["term", "inspection", "steering", "documents"],
  },
  usa: {
    platforms: ["copart", "iaai", "manheim"],
    transport: "sea",
    features: ["choice", "price", "history", "specs"],
    faq: ["term", "damage", "history", "lostBid", "documents"],
  },
  canada: {
    platforms: ["copart", "iaaCanada", "manheim"],
    transport: "sea",
    features: ["auctions", "winter", "mileage"],
    faq: ["term", "difference", "damage", "documents"],
  },
  europe: {
    platforms: ["auto1", "bca", "exLeasing"],
    transport: "truck",
    features: ["exLeasing", "fast", "dealerOnly"],
    faq: ["term", "exLeasing", "access", "documents"],
  },
  norway: {
    platforms: ["finn"],
    transport: "truck",
    features: ["electric", "care", "fast"],
    faq: ["term", "electric", "customs", "documents"],
  },
} as const satisfies Record<string, ImportCountryConfig>;

export type ImportCountry = keyof typeof IMPORT_COUNTRIES;

export const IMPORT_SEARCH_STEPS = [
  { id: "consultation", payment: false },
  { id: "contract", payment: false },
  { id: "serviceFee", payment: true },
  { id: "selection", payment: false },
  { id: "approval", payment: false },
  { id: "purchase", payment: true },
  { id: "delivery", payment: false },
] as const;

type SellServiceConfig = {
  href: string;
  facts: readonly string[];
  steps: readonly SellStep[];
  faq: readonly string[];
};

export const SELL_SERVICES = {
  buyout: {
    href: "/services/buyout",
    facts: ["fairPrice", "anyCondition", "instantPayment", "documents"],
    steps: [
      { id: "request" },
      { id: "inspection" },
      { id: "offer" },
      { id: "deal" },
    ],
    faq: ["cars", "price", "documents", "credit"],
  },
  consignment: {
    href: "/services/consignment",
    facts: ["free", "parking", "listing", "catalog"],
    steps: [
      { id: "request" },
      { id: "inspection" },
      { id: "listing", href: "/cars?status=available" },
      { id: "buyers" },
      { id: "deal" },
    ],
    faq: ["commission", "parking", "term", "usage"],
  },
} as const satisfies Record<string, SellServiceConfig>;

export type SellService = keyof typeof SELL_SERVICES;

export const SELL_COMPARE_ROWS = [
  "speed",
  "price",
  "fee",
  "involvement",
] as const;

export type ServiceKey = ImportCountry | SellService;
