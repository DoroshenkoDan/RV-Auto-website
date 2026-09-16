import { describe, expect, it } from "vitest";

import {
  CAR_SORT_FIELDS,
  getPageItems,
  parseCarSort,
  parsePage,
  toCatalogQuery,
} from "./params";

describe("parseCarSort", () => {
  it("returns a known sort as is", () => {
    expect(parseCarSort("price-asc")).toBe("price-asc");
  });

  it("falls back to newest for a missing value", () => {
    expect(parseCarSort(undefined)).toBe("newest");
  });

  it("falls back to newest for an unknown value", () => {
    expect(parseCarSort("cheapest")).toBe("newest");
  });
});

describe("CAR_SORT_FIELDS", () => {
  it("maps every sort to a Payload sort field", () => {
    expect(CAR_SORT_FIELDS).toEqual({
      newest: "-updatedAt",
      "price-asc": "price",
      "price-desc": "-price",
      "year-desc": "-year",
    });
  });
});

describe("toCatalogQuery", () => {
  it("keeps the default catalog url clean", () => {
    expect(toCatalogQuery({ sort: "newest", page: 1 })).toEqual({});
  });

  it("keeps status, sort and page together", () => {
    expect(
      toCatalogQuery({ status: "auction", sort: "price-asc", page: 2 }),
    ).toEqual({ status: "auction", sort: "price-asc", page: 2 });
  });

  it("drops the page when it is not given", () => {
    expect(toCatalogQuery({ status: "available", sort: "year-desc" })).toEqual({
      status: "available",
      sort: "year-desc",
    });
  });
});

describe("getPageItems", () => {
  it("lists every page when there are few of them", () => {
    expect(getPageItems(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses the far pages around the current one", () => {
    expect(getPageItems(6, 12)).toEqual([
      1,
      "ellipsis",
      5,
      6,
      7,
      "ellipsis",
      12,
    ]);
  });

  it("keeps the start expanded near the first page", () => {
    expect(getPageItems(2, 12)).toEqual([1, 2, 3, "ellipsis", 12]);
  });

  it("keeps the end expanded near the last page", () => {
    expect(getPageItems(11, 12)).toEqual([1, "ellipsis", 10, 11, 12]);
  });

  it("does not hide a single page behind an ellipsis", () => {
    expect(getPageItems(4, 12)).toEqual([1, 2, 3, 4, 5, "ellipsis", 12]);
  });
});

describe("parsePage", () => {
  it("reads a positive page number", () => {
    expect(parsePage("3")).toBe(3);
  });

  it("falls back to the first page for anything else", () => {
    expect(parsePage(undefined)).toBe(1);
    expect(parsePage("0")).toBe(1);
    expect(parsePage("-2")).toBe(1);
    expect(parsePage("1.5")).toBe(1);
    expect(parsePage("abc")).toBe(1);
  });
});
