import type { Car } from "@/payload-types";

type CarStatus = Car["status"];

export const CAR_SORTS = [
  "newest",
  "price-asc",
  "price-desc",
  "year-desc",
] as const;

export type CarSort = (typeof CAR_SORTS)[number];

export const CAR_SORT_FIELDS: Record<CarSort, string> = {
  newest: "-updatedAt",
  "price-asc": "price",
  "price-desc": "-price",
  "year-desc": "-year",
};

export function parseCarSort(value: string | undefined): CarSort {
  return CAR_SORTS.includes(value as CarSort) ? (value as CarSort) : "newest";
}

export function toCatalogQuery({
  status,
  sort,
  page,
}: {
  status?: CarStatus;
  sort: CarSort;
  page?: number;
}) {
  return {
    ...(status && { status }),
    ...(sort !== "newest" && { sort }),
    ...(page && page > 1 && { page }),
  };
}

export type PageItem = number | "ellipsis";

const MAX_PLAIN_PAGES = 7;

export function getPageItems(current: number, total: number): PageItem[] {
  if (total <= MAX_PLAIN_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const visible = [1, current - 1, current, current + 1, total]
    .filter((page) => page >= 1 && page <= total)
    .filter((page, i, pages) => pages.indexOf(page) === i)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];
  for (const page of visible) {
    const previous = items.at(-1);
    if (typeof previous === "number" && page - previous === 2) {
      items.push(previous + 1);
    } else if (typeof previous === "number" && page - previous > 2) {
      items.push("ellipsis");
    }
    items.push(page);
  }
  return items;
}

export function parsePage(value: string | undefined): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
