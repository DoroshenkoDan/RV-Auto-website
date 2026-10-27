import { describe, expect, test } from "vitest";

import type { Lead } from "../types";
import { buildCard } from "./buildCard";

const baseLead: Lead = {
  name: "Олександр",
  phone: "+380671234567",
  messenger: "telegram",
  comment: "",
  source: "cta",
  calculation: null,
  carSlug: null,
};

describe("buildCard", () => {
  test("maps a lead without comment, car or calculation", () => {
    expect(buildCard(baseLead)).toEqual({
      pipeline_id: 4,
      source_id: 2,
      contact: { full_name: "Олександр", phone: "+380671234567" },
      manager_comment: "Форма: блок заклику на сайті",
      custom_fields: [{ uuid: "LD_1002", value: "Telegram" }],
    });
  });

  test("leaves the card title to KeyCRM", () => {
    expect(buildCard(baseLead)).not.toHaveProperty("title");
  });

  test("puts the customer comment into the manager comment", () => {
    const card = buildCard({
      ...baseLead,
      source: "contacts",
      comment: "Цікавить доставка з Кореї",
    });

    expect(card.manager_comment).toBe(
      "Форма: сторінка контактів\nКоментар: Цікавить доставка з Кореї",
    );
  });

  test("sends the selected car slug as a custom field", () => {
    const card = buildCard({ ...baseLead, carSlug: "bmw-x5-2019" });

    expect(card.custom_fields).toContainEqual({
      uuid: "LD_1003",
      value: "bmw-x5-2019",
    });
  });
});

describe("buildCard with a calculation", () => {
  test("sends the rounded total as a custom field", () => {
    const card = buildCard({
      ...baseLead,
      calculation: {
        input: {
          fuel: "petrol",
          vehicle: "car",
          auction: "copart",
          state: null,
          city: null,
          engineVolume: 2000,
          batteryCapacity: null,
          year: 2019,
          lotPrice: 12000,
        },
        total: 24300.75,
      },
    });

    expect(card.custom_fields).toContainEqual({
      uuid: "LD_1004",
      value: "24301",
    });
  });

  test("describes a combustion car in the manager comment", () => {
    const card = buildCard({
      ...baseLead,
      calculation: {
        input: {
          fuel: "petrol",
          vehicle: "car",
          auction: "copart",
          state: null,
          city: null,
          engineVolume: 2000,
          batteryCapacity: null,
          year: 2019,
          lotPrice: 12000,
        },
        total: 24300,
      },
    });

    expect(card.manager_comment).toContain(
      "Розрахунок: Copart, Легковий, 2019, Бензин, двигун 2000 см³, лот 12000 $",
    );
  });

  test("describes an electric car by battery capacity", () => {
    const card = buildCard({
      ...baseLead,
      calculation: {
        input: {
          fuel: "electric",
          vehicle: "suv",
          auction: "encar",
          state: null,
          city: null,
          engineVolume: null,
          batteryCapacity: 60,
          year: 2021,
          lotPrice: 15000,
        },
        total: 30000,
      },
    });

    expect(card.manager_comment).toContain(
      "Розрахунок: Encar, Кросовер, 2021, Електро, батарея 60 кВт·год, лот 15000 $",
    );
  });

  test("names the chosen us state and city next to the auction", () => {
    const card = buildCard({
      ...baseLead,
      calculation: {
        input: {
          fuel: "petrol",
          vehicle: "car",
          auction: "copart",
          state: "FL",
          city: "Ocala",
          engineVolume: 3000,
          batteryCapacity: null,
          year: 2019,
          lotPrice: 8900,
        },
        total: 18486,
      },
    });

    expect(card.manager_comment).toContain(
      "Розрахунок: Copart (FL, Ocala), Легковий, 2019",
    );
  });

  test("names only the state when no city was chosen", () => {
    const card = buildCard({
      ...baseLead,
      calculation: {
        input: {
          fuel: "petrol",
          vehicle: "car",
          auction: "iaai",
          state: "CA",
          city: null,
          engineVolume: 2000,
          batteryCapacity: null,
          year: 2019,
          lotPrice: 8900,
        },
        total: 18000,
      },
    });

    expect(card.manager_comment).toContain("Розрахунок: IAAI (CA), Легковий");
  });
});
