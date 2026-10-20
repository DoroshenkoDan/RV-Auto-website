import { describe, expect, it } from "vitest";

import { buildSitemap } from "./sitemap";

describe("buildSitemap", () => {
  it("lists every static path in every locale with language alternates", () => {
    const entries = buildSitemap({ staticPaths: ["/", "/cars"], cars: [] });

    expect(entries.map(({ url }) => url)).toEqual([
      "https://revolution-auto.com.ua/uk",
      "https://revolution-auto.com.ua/en",
      "https://revolution-auto.com.ua/uk/cars",
      "https://revolution-auto.com.ua/en/cars",
    ]);
    expect(entries[2]?.alternates).toEqual({
      languages: {
        uk: "https://revolution-auto.com.ua/uk/cars",
        en: "https://revolution-auto.com.ua/en/cars",
        "x-default": "https://revolution-auto.com.ua/cars",
      },
    });
    expect(entries[0]).not.toHaveProperty("lastModified");
  });

  it("adds car pages with their last update date", () => {
    const entries = buildSitemap({
      staticPaths: [],
      cars: [{ slug: "bmw-x5", updatedAt: "2026-10-01T10:00:00.000Z" }],
    });

    expect(entries).toEqual([
      expect.objectContaining({
        url: "https://revolution-auto.com.ua/uk/cars/bmw-x5",
        lastModified: "2026-10-01T10:00:00.000Z",
      }),
      expect.objectContaining({
        url: "https://revolution-auto.com.ua/en/cars/bmw-x5",
        lastModified: "2026-10-01T10:00:00.000Z",
      }),
    ]);
  });
});
