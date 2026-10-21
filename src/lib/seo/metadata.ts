import type { Metadata } from "next";

import { routing, type Locale } from "@/i18n/routing";

import { OG_IMAGE, SITE_NAME, SITE_URL } from "./site";

export type ShareImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

const OG_LOCALES: Record<Locale, string> = { uk: "uk_UA", en: "en_US" };

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
  image = OG_IMAGE,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: ShareImage;
}): Metadata {
  return {
    title,
    description,
    alternates: getAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: localizedPath(locale, path),
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => OG_LOCALES[language]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
