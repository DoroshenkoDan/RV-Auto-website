import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/api/car-media/file/",
        "/api/team-media/file/",
        "/api/review-media/file/",
      ],
      disallow: ["/admin", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
