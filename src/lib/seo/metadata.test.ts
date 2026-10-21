import { describe, expect, it } from "vitest";

import {
  absoluteUrl,
  buildPageMetadata,
  getAlternates,
  localizedPath,
  pageUrl,
} from "./metadata";
import { OG_IMAGE } from "./site";

describe("localizedPath", () => {
  it("maps the home page to the bare locale prefix", () => {
    expect(localizedPath("uk", "/")).toBe("/uk");
    expect(localizedPath("en", "/")).toBe("/en");
  });

  it("prefixes nested paths with the locale", () => {
    expect(localizedPath("uk", "/cars")).toBe("/uk/cars");
    expect(localizedPath("en", "/services/usa")).toBe("/en/services/usa");
  });
});

describe("absoluteUrl", () => {
  it("joins a path with the production domain", () => {
    expect(absoluteUrl("/uk/cars")).toBe(
      "https://revolution-auto.com.ua/uk/cars",
    );
  });
});

describe("pageUrl", () => {
  it("builds the absolute url of a localized page", () => {
    expect(pageUrl("en", "/cars/bmw-x5")).toBe(
      "https://revolution-auto.com.ua/en/cars/bmw-x5",
    );
  });
});

describe("getAlternates", () => {
  it("points canonical at the current locale and lists every language", () => {
    expect(getAlternates("en", "/cars")).toEqual({
      canonical: "/en/cars",
      languages: {
        uk: "/uk/cars",
        en: "/en/cars",
        "x-default": "/cars",
      },
    });
  });

  it("uses the site root as x-default for the home page", () => {
    expect(getAlternates("uk", "/")).toEqual({
      canonical: "/uk",
      languages: { uk: "/uk", en: "/en", "x-default": "/" },
    });
  });
});

describe("buildPageMetadata", () => {
  const page = {
    path: "/cars",
    title: "Catalog | Revolution Auto",
    description: "Cars in stock",
  };

  it("falls back to the default share image", () => {
    const metadata = buildPageMetadata({ locale: "uk", ...page });

    expect(metadata.openGraph?.images).toEqual([OG_IMAGE]);
    expect(metadata.twitter?.images).toEqual([OG_IMAGE]);
  });

  it("uses the given share image", () => {
    const image = { url: "/api/car-media/file/bmw.jpg", alt: "BMW X5" };
    const metadata = buildPageMetadata({ locale: "uk", ...page, image });

    expect(metadata.openGraph?.images).toEqual([image]);
    expect(metadata.twitter?.images).toEqual([image]);
  });

  it("describes the page for Open Graph in the current locale", () => {
    expect(
      buildPageMetadata({ locale: "en", ...page }).openGraph,
    ).toMatchObject({
      type: "website",
      siteName: "Revolution Auto",
      url: "/en/cars",
      title: page.title,
      description: page.description,
      locale: "en_US",
      alternateLocale: ["uk_UA"],
    });
  });

  it("uses the large image Twitter card", () => {
    expect(buildPageMetadata({ locale: "uk", ...page }).twitter).toMatchObject({
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    });
  });
});
