"use client";

import { useEffect, useRef, useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import {
  AUCTION_TYPES,
  BATTERY_CAPACITY_LIMITS,
  DEFAULT_CALCULATOR_INPUT,
  ENGINE_VOLUME_LIMITS,
  FUEL_TYPES,
  LOT_PRICE_LIMITS,
  VEHICLE_TYPES,
  getYearOptions,
} from "../../options";
import type { CalculatorInput } from "../../types";
import { AmountField } from "./components/AmountField";
import { SegmentedField } from "./components/SegmentedField";
import { YearField } from "./components/YearField";

const YEAR_OPTIONS = getYearOptions();

export function CalculatorForm({
  onCalculate,
  className,
}: {
  onCalculate?: (input: CalculatorInput) => void;
  className?: string;
}) {
  const t = useTranslations("homePage.calculator.form");
  const locale = useLocale();

  const [values, setValues] = useState<CalculatorInput>(
    DEFAULT_CALCULATOR_INPUT,
  );

  const engineVolumeActions = useRef<Field.Root.Actions | null>(null);
  const previousVehicle = useRef(values.vehicle);

  const engineVolumeLimits = ENGINE_VOLUME_LIMITS[values.vehicle];

  useEffect(() => {
    if (previousVehicle.current === values.vehicle) {
      return;
    }

    previousVehicle.current = values.vehicle;

    if (values.engineVolume !== null) {
      engineVolumeActions.current?.validate();
    }
  }, [values.vehicle, values.engineVolume]);

  return (
    <Form
      onFormSubmit={() => onCalculate?.(values)}
      className={cn(
        "flex flex-col gap-y-6 rounded-l-md bg-white p-6 lg:p-8 2xl:gap-y-8 2xl:p-12",
        className,
      )}
    >
      <div className="grid gap-x-5 gap-y-5 lg:grid-cols-2 2xl:gap-y-7">
        <SegmentedField
          name="fuel"
          label={t("fuel.label")}
          options={FUEL_TYPES.map((value) => ({
            value,
            label: t(`fuel.${value}`),
          }))}
          value={values.fuel}
          onValueChange={(fuel) =>
            setValues((previous) => ({ ...previous, fuel }))
          }
          className="lg:col-span-2"
        />

        {values.fuel === "electric" ? (
          <AmountField
            name="batteryCapacity"
            label={t("batteryCapacity.label")}
            placeholder={t("batteryCapacity.placeholder")}
            value={values.batteryCapacity}
            onValueChange={(batteryCapacity) =>
              setValues((previous) => ({ ...previous, batteryCapacity }))
            }
            min={BATTERY_CAPACITY_LIMITS.min}
            max={BATTERY_CAPACITY_LIMITS.max}
            locale={locale}
            format={{ useGrouping: false }}
            errors={{
              valueMissing: t("errors.required"),
              rangeUnderflow: t("errors.min", {
                min: BATTERY_CAPACITY_LIMITS.min,
              }),
              rangeOverflow: t("errors.max", {
                max: BATTERY_CAPACITY_LIMITS.max,
              }),
            }}
          />
        ) : (
          <AmountField
            name="engineVolume"
            label={t("engineVolume.label")}
            placeholder={t("engineVolume.placeholder")}
            value={values.engineVolume}
            onValueChange={(engineVolume) =>
              setValues((previous) => ({ ...previous, engineVolume }))
            }
            min={engineVolumeLimits.min}
            max={engineVolumeLimits.max}
            locale={locale}
            format={{ useGrouping: false }}
            errors={{
              valueMissing: t("errors.required"),
              rangeUnderflow: t("errors.min", { min: engineVolumeLimits.min }),
              rangeOverflow: t("errors.max", { max: engineVolumeLimits.max }),
            }}
            actionsRef={engineVolumeActions}
          />
        )}

        <YearField
          name="year"
          label={t("year.label")}
          placeholder={t("year.placeholder")}
          years={YEAR_OPTIONS}
          value={values.year}
          onValueChange={(year) =>
            setValues((previous) => ({ ...previous, year }))
          }
          error={t("errors.required")}
        />

        <SegmentedField
          name="vehicle"
          label={t("vehicle.label")}
          options={VEHICLE_TYPES.map((value) => ({
            value,
            label: t(`vehicle.${value}`),
          }))}
          value={values.vehicle}
          onValueChange={(vehicle) =>
            setValues((previous) => ({ ...previous, vehicle }))
          }
          className="lg:col-span-2"
        />

        <SegmentedField
          name="auction"
          label={t("auction.label")}
          options={AUCTION_TYPES.map((value) => ({
            value,
            label: t(`auction.${value}`),
          }))}
          value={values.auction}
          onValueChange={(auction) =>
            setValues((previous) => ({ ...previous, auction }))
          }
          className="lg:col-span-2"
        />

        <AmountField
          name="lotPrice"
          label={t("lotPrice.label")}
          placeholder={t("lotPrice.placeholder")}
          value={values.lotPrice}
          onValueChange={(lotPrice) =>
            setValues((previous) => ({ ...previous, lotPrice }))
          }
          min={LOT_PRICE_LIMITS.min}
          max={LOT_PRICE_LIMITS.max}
          locale={locale}
          errors={{
            valueMissing: t("errors.required"),
            rangeUnderflow: t("errors.min", { min: LOT_PRICE_LIMITS.min }),
            rangeOverflow: t("errors.max", { max: LOT_PRICE_LIMITS.max }),
          }}
          className="lg:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="h-12 w-full cursor-pointer rounded-sm bg-brand text-base leading-normal font-semibold text-night-soft transition-colors duration-200 hover:bg-brand/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand 2xl:h-14"
      >
        {t("submit")}
      </button>
    </Form>
  );
}
