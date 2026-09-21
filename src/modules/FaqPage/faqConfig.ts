import type { ImportCountry } from "@/modules/ServicesShared/servicesConfig";

export const FAQ_CATEGORIES = [
  {
    id: "start",
    questions: ["process", "country", "contract", "budget"],
  },
  {
    id: "cost",
    questions: ["turnkey", "duties", "payments", "extra", "fee"],
  },
  {
    id: "auction",
    questions: ["inspection", "damage", "titles", "lostBid", "ownLot"],
  },
  {
    id: "delivery",
    questions: ["term", "insurance", "tracking", "destination"],
  },
  {
    id: "customs",
    questions: ["electric", "certification", "registration", "documents"],
  },
  {
    id: "risks",
    questions: ["condition", "money", "refuse"],
  },
  {
    id: "sell",
    questions: ["options", "sellDocuments", "credit"],
  },
] as const;

export type FaqCategoryId = (typeof FAQ_CATEGORIES)[number]["id"];

export const FAQ_LINKS = {
  calculator: "/#calculator",
  compare: "#compare",
  catalog: "/cars",
  contacts: "/contacts",
  reviews: "/reviews",
  usa: "/services/usa",
  canada: "/services/canada",
  europe: "/services/europe",
  norway: "/services/norway",
  china: "/services/china",
  korea: "/services/korea",
  buyout: "/services/buyout",
  consignment: "/services/consignment",
} as const;

export type FaqLinkTag = keyof typeof FAQ_LINKS;

export const FAQ_COMPARE_COUNTRIES = [
  "usa",
  "canada",
  "korea",
  "china",
  "europe",
  "norway",
] as const satisfies readonly ImportCountry[];
