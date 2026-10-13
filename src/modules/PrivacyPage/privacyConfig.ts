export const PRIVACY_EMAIL = "dimas.dudko332@gmail.com";

// TODO: when analytics (GA4, Meta Pixel, etc.) launches, update the sharing, cookies and retention sections and add a cookie consent banner
export const PRIVACY_SECTIONS = [
  "general",
  "data",
  "purposes",
  "legalBasis",
  "sharing",
  "retention",
  "cookies",
  "security",
  "rights",
  "contacts",
  "changes",
] as const;

export type PrivacySectionId = (typeof PRIVACY_SECTIONS)[number];
