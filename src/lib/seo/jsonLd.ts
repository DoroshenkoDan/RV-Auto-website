import { PHONE_E164, SOCIAL_LINKS } from "@/lib/contacts";
import type { Car } from "@/payload-types";

import { absoluteUrl } from "./metadata";
import {
  BUSINESS_ADDRESS,
  LEGAL_NAME,
  LOGO_PATH,
  OPENING_HOURS,
  SITE_NAME,
  SITE_URL,
} from "./site";

export type JsonLdObject = {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
};

export type CarJsonLdInput = Pick<
  Car,
  | "title"
  | "description"
  | "vin"
  | "year"
  | "mileageKm"
  | "engine"
  | "transmission"
  | "drivetrain"
  | "status"
  | "price"
> & {
  url: string;
  images: string[];
};

export type BreadcrumbItem = { name: string; url: string };

const SCHEMA = "https://schema.org";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const DRIVE_WHEEL_CONFIGURATION: Record<Car["drivetrain"], string> = {
  AWD: `${SCHEMA}/AllWheelDriveConfiguration`,
  "4WD": `${SCHEMA}/FourWheelDriveConfiguration`,
  FWD: `${SCHEMA}/FrontWheelDriveConfiguration`,
  RWD: `${SCHEMA}/RearWheelDriveConfiguration`,
};

const TRANSMISSION: Record<Car["transmission"], string> = {
  automatic: "Automatic",
  manual: "Manual",
};

const AVAILABILITY: Partial<Record<Car["status"], string>> = {
  available: `${SCHEMA}/InStock`,
  inTransit: `${SCHEMA}/PreOrder`,
};

export function serializeJsonLd(data: JsonLdObject) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildOrganizationJsonLd(): JsonLdObject {
  return {
    "@context": SCHEMA,
    "@type": "AutoDealer",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl(LOGO_PATH),
    telephone: PHONE_E164,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", ...OPENING_HOURS },
    ],
    sameAs: SOCIAL_LINKS.map(({ href }) => href),
  };
}

export function buildCarJsonLd(car: CarJsonLdInput): JsonLdObject {
  const availability = AVAILABILITY[car.status];

  return {
    "@context": SCHEMA,
    "@type": "Car",
    name: car.title,
    url: car.url,
    image: car.images,
    ...(car.description && { description: car.description }),
    ...(car.vin && { vehicleIdentificationNumber: car.vin }),
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileageKm,
      unitCode: "KMT",
    },
    vehicleEngine: { "@type": "EngineSpecification", name: car.engine },
    vehicleTransmission: TRANSMISSION[car.transmission],
    driveWheelConfiguration: DRIVE_WHEEL_CONFIGURATION[car.drivetrain],
    ...(availability && {
      offers: {
        "@type": "Offer",
        price: car.price,
        priceCurrency: "USD",
        availability,
        itemCondition: `${SCHEMA}/UsedCondition`,
        url: car.url,
        seller: { "@id": ORGANIZATION_ID },
      },
    }),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": SCHEMA,
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: url,
    })),
  };
}
