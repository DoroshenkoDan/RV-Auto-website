import type { PaginatedDocs } from "payload";

import type { Car } from "@/payload-types";
import type { Locale } from "@/i18n/routing";

import { getPayloadClient } from "./client";

export type CarStatus = Car["status"];

export async function getFeaturedCars(locale: Locale): Promise<Car[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "cars",
    where: { featured: { equals: true } },
    locale,
    sort: "-updatedAt",
    depth: 1,
    limit: 0,
  });
  return result.docs;
}

export async function getCars({
  locale,
  status,
  page,
  limit = 12,
}: {
  locale: Locale;
  status?: CarStatus;
  page: number;
  limit?: number;
}): Promise<PaginatedDocs<Car>> {
  const payload = await getPayloadClient();
  return payload.find({
    collection: "cars",
    where: status ? { status: { equals: status } } : {},
    locale,
    sort: "-updatedAt",
    depth: 1,
    page,
    limit,
  });
}

export async function getCarsCount(): Promise<number> {
  const payload = await getPayloadClient();
  const result = await payload.count({ collection: "cars" });
  return result.totalDocs;
}

export async function getCarBySlug(
  slug: string,
  locale: Locale,
): Promise<Car | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "cars",
    where: { slug: { equals: slug } },
    locale,
    depth: 1,
    limit: 1,
  });
  return result.docs[0] ?? null;
}
