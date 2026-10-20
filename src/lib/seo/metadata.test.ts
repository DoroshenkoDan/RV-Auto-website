import { describe, expect, it } from "vitest";

import { absoluteUrl, getAlternates, localizedPath, pageUrl } from "./metadata";

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
