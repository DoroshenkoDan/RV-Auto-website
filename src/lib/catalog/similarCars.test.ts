import { describe, expect, it } from "vitest";

import { pickClosestByPrice } from "./similarCars";

const car = (id: number, price: number) => ({ id, price });

describe("pickClosestByPrice", () => {
  it("returns nothing for an empty list", () => {
    expect(pickClosestByPrice([], 20000, 4)).toEqual([]);
  });

  it("returns every candidate when there are fewer than the limit", () => {
    const result = pickClosestByPrice([car(1, 10000), car(2, 30000)], 20000, 4);
    expect(result.map(({ id }) => id).sort()).toEqual([1, 2]);
  });

  it("picks the closest prices from both sides", () => {
    const candidates = [
      car(1, 5000),
      car(2, 18000),
      car(3, 19500),
      car(4, 21000),
      car(5, 23000),
      car(6, 40000),
    ];
    const result = pickClosestByPrice(candidates, 20000, 4);
    expect(result.map(({ id }) => id)).toEqual([3, 4, 2, 5]);
  });

  it("prefers the cheaper car when the distance is the same", () => {
    const result = pickClosestByPrice([car(1, 22000), car(2, 18000)], 20000, 1);
    expect(result.map(({ id }) => id)).toEqual([2]);
  });

  it("does not mutate the input", () => {
    const candidates = [car(1, 30000), car(2, 21000)];
    pickClosestByPrice(candidates, 20000, 1);
    expect(candidates.map(({ id }) => id)).toEqual([1, 2]);
  });
});
