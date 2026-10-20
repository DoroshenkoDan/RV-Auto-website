import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

import { absoluteUrl, pageUrl } from "./metadata";

export type SitemapCar = { slug: string; updatedAt: string };

function localizedEntries(
  path: string,
  lastModified?: string,
): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, pageUrl(locale, path)]),
    ),
    "x-default": absoluteUrl(path),
  };

  return routing.locales.map((locale) => ({
    url: pageUrl(locale, path),
    ...(lastModified && { lastModified }),
    alternates: { languages },
  }));
}

export function buildSitemap({
  staticPaths,
  cars,
}: {
  staticPaths: readonly string[];
  cars: readonly SitemapCar[];
}): MetadataRoute.Sitemap {
  return [
    ...staticPaths.flatMap((path) => localizedEntries(path)),
    ...cars.flatMap(({ slug, updatedAt }) =>
      localizedEntries(`/cars/${slug}`, updatedAt),
    ),
  ];
}
