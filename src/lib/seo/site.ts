export const SITE_URL = "https://revolution-auto.com.ua";

export const SITE_NAME = "Revolution Auto";

export const LEGAL_NAME = "ФОП Дудко Дмитро Борисович";

export const LOGO_PATH = "/images/shared/RVLogoBrand.webp";

export const OG_IMAGE = {
  url: "/images/shared/og-default.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export const BUSINESS_ADDRESS = {
  streetAddress: "вул. Глибочицька, 27-А",
  addressLocality: "Київ",
  addressCountry: "UA",
} as const;

export const OPENING_HOURS = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "10:00",
  closes: "19:00",
} as const;
