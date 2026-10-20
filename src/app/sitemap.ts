import type { MetadataRoute } from "next";

import { NAV_LINKS } from "@/layout/MainLayout/navItems";
import { getSitemapCars } from "@/lib/payload/cars";
import { buildSitemap } from "@/lib/seo/sitemap";

export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  ...NAV_LINKS.map(({ href }) => href),
  "/contacts",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap({
    staticPaths: STATIC_PATHS,
    cars: await getSitemapCars(),
  });
}
