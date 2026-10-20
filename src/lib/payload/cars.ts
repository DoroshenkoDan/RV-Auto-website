import { cache } from "react";
import type { PaginatedDocs, Where } from "payload";

import type { Car } from "@/payload-types";
import type { Locale } from "@/i18n/routing";
import { CAR_SORT_FIELDS, type CarSort } from "@/lib/catalog/params";
import type { SitemapCar } from "@/lib/seo/sitemap";
import {
  SIMILAR_CARS_LIMIT,
  pickClosestByPrice,
} from "@/lib/catalog/similarCars";

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
  sort = "newest",
  page,
  limit = 12,
}: {
  locale: Locale;
  status?: CarStatus;
  sort?: CarSort;
  page: number;
  limit?: number;
}): Promise<PaginatedDocs<Car>> {
  const payload = await getPayloadClient();
  return payload.find({
    collection: "cars",
    where: status ? { status: { equals: status } } : {},
    locale,
    sort: CAR_SORT_FIELDS[sort],
    depth: 1,
    page,
    limit,
  });
}

export async function getCarsCount(status?: CarStatus): Promise<number> {
  const payload = await getPayloadClient();
  const result = await payload.count({
    collection: "cars",
    where: status ? { status: { equals: status } } : {},
  });
  return result.totalDocs;
}

export const getCarBySlug = cache(async function getCarBySlug(
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
});

async function findNearestByPrice(
  car: Car,
  locale: Locale,
  where: Where,
): Promise<Car[]> {
  const payload = await getPayloadClient();
  const query = (side: Where, sort: string) =>
    payload.find({
      collection: "cars",
      where: { and: [where, side] },
      locale,
      sort,
      depth: 1,
      limit: SIMILAR_CARS_LIMIT,
    });

  const [cheaper, pricier] = await Promise.all([
    query({ price: { less_than_equal: car.price } }, "-price"),
    query({ price: { greater_than: car.price } }, "price"),
  ]);

  return pickClosestByPrice(
    [...cheaper.docs, ...pricier.docs],
    car.price,
    SIMILAR_CARS_LIMIT,
  );
}

export async function getSimilarCars(car: Car, locale: Locale): Promise<Car[]> {
  const sameStatus = await findNearestByPrice(car, locale, {
    and: [{ id: { not_equals: car.id } }, { status: { equals: car.status } }],
  });

  if (sameStatus.length >= SIMILAR_CARS_LIMIT) return sameStatus;

  const others = await findNearestByPrice(car, locale, {
    id: { not_in: [car.id, ...sameStatus.map(({ id }) => id)] },
  });

  return [
    ...sameStatus,
    ...pickClosestByPrice(
      others,
      car.price,
      SIMILAR_CARS_LIMIT - sameStatus.length,
    ),
  ];
}

export async function getSitemapCars(): Promise<SitemapCar[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "cars",
    select: { slug: true, updatedAt: true },
    depth: 0,
    pagination: false,
  });
  return result.docs.map(({ slug, updatedAt }) => ({ slug, updatedAt }));
}
