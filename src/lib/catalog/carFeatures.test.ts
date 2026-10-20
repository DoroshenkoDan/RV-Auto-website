import { describe, expect, it } from "vitest";

import en from "@/i18n/messages/en.json";
import uk from "@/i18n/messages/uk.json";

import { CAR_FEATURES, sortCarFeatures } from "./carFeatures";

describe("CAR_FEATURES", () => {
  it("has no duplicates", () => {
    expect(new Set(CAR_FEATURES).size).toBe(CAR_FEATURES.length);
  });

  it.each([
    ["uk", uk.carPage.features.items],
    ["en", en.carPage.features.items],
  ])("has a %s label for every feature and nothing extra", (_, items) => {
    expect(Object.keys(items).sort()).toEqual([...CAR_FEATURES].sort());
    for (const label of Object.values(items)) {
      expect(label.trim()).not.toBe("");
    }
  });
});

describe("sortCarFeatures", () => {
  it("orders features as in the list, not as they were picked", () => {
    expect(
      sortCarFeatures(["towHitch", "airConditioning", "heatedSeats"]),
    ).toEqual(["airConditioning", "heatedSeats", "towHitch"]);
  });

  it("returns nothing for an empty selection", () => {
    expect(sortCarFeatures([])).toEqual([]);
  });
});
