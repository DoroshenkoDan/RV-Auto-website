import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
