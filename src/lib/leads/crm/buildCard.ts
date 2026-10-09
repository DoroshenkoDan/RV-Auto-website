import uk from "@/i18n/messages/uk.json";
import type { CalculatorInput } from "@/lib/calculator/types";

import type { Lead } from "../types";

import {
  CAR_FIELD,
  MESSENGER_FIELD,
  MESSENGER_LABELS,
  PIPELINE_ID,
  SOURCE_ID,
  SOURCE_LABELS,
  TOTAL_FIELD,
} from "./config";

const FUEL_LABELS = uk.homePage.calculator.form.fuel;

const VEHICLE_LABELS = uk.homePage.calculator.form.vehicle;

const PLATFORM_LABELS = uk.services.platforms;

function describeCalculation(input: CalculatorInput) {
  const engine =
    input.fuel === "electric"
      ? `батарея ${input.batteryCapacity} кВт·год`
      : `двигун ${input.engineVolume} см³`;

  return [
    PLATFORM_LABELS[input.auction].name,
    VEHICLE_LABELS[input.vehicle],
    input.year,
    FUEL_LABELS[input.fuel],
    engine,
    `лот ${input.lotPrice} $`,
  ].join(", ");
}

export function buildCard(lead: Lead) {
  const lines = [`Форма: ${SOURCE_LABELS[lead.source]}`];

  if (lead.comment) {
    lines.push(`Коментар: ${lead.comment}`);
  }

  const customFields = [
    { uuid: MESSENGER_FIELD, value: MESSENGER_LABELS[lead.messenger] },
  ];

  if (lead.carSlug) {
    customFields.push({ uuid: CAR_FIELD, value: lead.carSlug });
  }

  if (lead.calculation) {
    lines.push(`Розрахунок: ${describeCalculation(lead.calculation.input)}`);

    customFields.push({
      uuid: TOTAL_FIELD,
      value: String(Math.round(lead.calculation.total)),
    });
  }

  return {
    pipeline_id: PIPELINE_ID,
    source_id: SOURCE_ID,
    contact: { full_name: lead.name, phone: lead.phone },
    manager_comment: lines.join("\n"),
    custom_fields: customFields,
  };
}
