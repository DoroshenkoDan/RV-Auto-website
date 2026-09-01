import type { Review } from "@/payload-types";
import type { Locale } from "@/i18n/routing";

import { getPayloadClient } from "./client";

const FEATURED_LIMIT = 8;

export async function getFeaturedReviews(locale: Locale): Promise<Review[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "reviews",
    locale,
    where: { featured: { equals: true } },
    sort: "order",
    depth: 1,
    limit: FEATURED_LIMIT,
  });
  return result.docs;
}

export async function getReviewsCount(): Promise<number> {
  const payload = await getPayloadClient();
  const result = await payload.count({ collection: "reviews" });
  return result.totalDocs;
}
