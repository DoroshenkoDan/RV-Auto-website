import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import en from "@/i18n/messages/en.json";
import uk from "@/i18n/messages/uk.json";

import {
  IMPORT_COUNTRIES,
  IMPORT_COUNTRY_FACTS,
  IMPORT_SEARCH_STEPS,
  PLATFORMS,
  SELL_COMPARE_ROWS,
  SELL_SERVICES,
} from "./servicesConfig";

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

function serviceKeys(
  service: string,
  facts: readonly string[],
  faq: readonly string[],
) {
  const base = `services.${service}`;

  return [
    `${base}.meta.title`,
    `${base}.meta.description`,
    `${base}.hero.eyebrow`,
    `${base}.hero.title`,
    `${base}.hero.lede`,
    `${base}.cta.title`,
    `${base}.cta.description`,
    ...facts.flatMap((fact) => [
      `${base}.hero.facts.${fact}.title`,
      `${base}.hero.facts.${fact}.description`,
    ]),
    ...faq.flatMap((id) => [
      `${base}.faq.${id}.question`,
      `${base}.faq.${id}.answer`,
    ]),
  ];
}

const expectedKeys = [
  ...Object.keys(PLATFORMS).flatMap((id) => [
    `services.platforms.${id}.name`,
    `services.platforms.${id}.description`,
  ]),
  ...IMPORT_SEARCH_STEPS.map(
    ({ id }) => `services.importStages.search.items.${id}`,
  ),
  ...Object.entries(IMPORT_COUNTRIES).flatMap(
    ([country, { features, faq }]) => [
      ...serviceKeys(country, IMPORT_COUNTRY_FACTS, faq),
      `services.${country}.features.title`,
      ...features.flatMap((id) => [
        `services.${country}.features.items.${id}.title`,
        `services.${country}.features.items.${id}.description`,
      ]),
    ],
  ),
  ...Object.entries(SELL_SERVICES).flatMap(
    ([service, { facts, steps, faq }]) => [
      ...serviceKeys(service, facts, faq),
      `services.${service}.steps.title`,
      ...steps.flatMap((step) => [
        `services.${service}.steps.items.${step.id}.title`,
        `services.${service}.steps.items.${step.id}.description`,
        ...("href" in step
          ? [`services.${service}.steps.items.${step.id}.link`]
          : []),
      ]),
      `services.sellCompare.services.${service}`,
      `services.sellCompare.cta.${service}`,
      ...SELL_COMPARE_ROWS.flatMap((row) => [
        `services.sellCompare.rows.${row}.label`,
        `services.sellCompare.rows.${row}.${service}`,
      ]),
    ],
  ),
];

describe("services translations", () => {
  it.each([
    ["uk", uk],
    ["en", en],
  ])("%s has every key the services config needs", (_, messages) => {
    const missing = expectedKeys.filter(
      (key) => typeof lookup(messages, key) !== "string",
    );

    expect(missing).toEqual([]);
  });
});

describe("platform logos", () => {
  it("every configured logo exists in public", () => {
    const missing = Object.values(PLATFORMS)
      .flatMap((platform) => ("logo" in platform ? [platform.logo.src] : []))
      .filter((src) => !existsSync(join(process.cwd(), "public", src)));

    expect(missing).toEqual([]);
  });
});
