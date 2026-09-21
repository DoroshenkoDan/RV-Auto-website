import { describe, expect, it } from "vitest";

import en from "@/i18n/messages/en.json";
import uk from "@/i18n/messages/uk.json";

import { FAQ_CATEGORIES, FAQ_LINKS } from "./faqConfig";

function lookup(messages: unknown, path: string) {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        typeof node === "object" && node !== null
          ? (node as Record<string, unknown>)[key]
          : undefined,
      messages,
    );
}

describe("faqConfig", () => {
  it("uses unique anchors for categories and page blocks", () => {
    const anchors = [
      ...FAQ_CATEGORIES.map(({ id }) => id),
      FAQ_LINKS.compare.slice(1),
      "cost-example",
    ];

    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it.each([
    ["uk", uk],
    ["en", en],
  ])("has %s messages for every category and question", (_, messages) => {
    const keys = FAQ_CATEGORIES.flatMap(({ id, questions }) => {
      const base = `faqPage.categories.${id}`;

      return [
        `${base}.title`,
        `${base}.description`,
        ...questions.flatMap((question) => [
          `${base}.questions.${question}.question`,
          `${base}.questions.${question}.answer`,
        ]),
      ];
    });

    const missing = keys.filter(
      (key) => typeof lookup(messages, key) !== "string",
    );

    expect(missing).toEqual([]);
  });
});
