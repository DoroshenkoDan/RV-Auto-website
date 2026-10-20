import type { Metadata } from "next";

import { routing, type Locale } from "@/i18n/routing";

import { SITE_URL } from "./site";

export function localizedPath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageUrl(locale: Locale, path: string) {
  return absoluteUrl(localizedPath(locale, path));
}

export function getAlternates(locale: Locale, path: string) {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((language) => [
          language,
          localizedPath(language, path),
        ]),
      ),
      "x-default": path,
    },
  } satisfies Metadata["alternates"];
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: getAlternates(locale, path),
  };
}
