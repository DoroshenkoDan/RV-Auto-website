"use client";

import { Field } from "@base-ui/react/field";
import { NumberField } from "@base-ui/react/number-field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { AuctionField } from "@/components/AuctionField";
import {
  BATTERY_CAPACITY_LIMITS,
  ENGINE_VOLUME_LIMITS,
  FUEL_TYPES,
  LOT_PRICE_LIMITS,
  VEHICLE_TYPES,
  getYearOptions,
} from "@/lib/calculator/options";
import type { CalculatorInput } from "@/lib/calculator/types";
import { FIELD_ROOT, fieldControl, fieldLabel } from "@/ui/field";
import { SegmentedField } from "@/ui/segmented-control";

const YEAR_OPTIONS = getYearOptions();

export function CarDetails({
  value,
  onValueChange,
}: {
  value: CalculatorInput;
  onValueChange: (value: CalculatorInput) => void;
}) {
  const t = useTranslations("contactsPage.leadSection.car");
  const locale = useLocale();

  const engineVolumeLimits = ENGINE_VOLUME_LIMITS[value.vehicle];

  function patch(changes: Partial<CalculatorInput>) {
    onValueChange({ ...value, ...changes });
  }

  return (
    <div className="flex flex-col gap-y-stack">
      <div>
        <p className="text-h3 font-semibold">{t("title")}</p>
        <p className="mt-2 text-label text-ink-muted">{t("hint")}</p>
      </div>

      <div className="grid gap-x-stack gap-y-stack lg:grid-cols-2">
        <SegmentedField
          name="fuel"
          label={t("fuel.label")}
          options={FUEL_TYPES.map((item) => ({
            value: item,
            label: t(`fuel.${item}`),
          }))}
          value={value.fuel}
          onValueChange={(fuel) => patch({ fuel })}
          className="lg:col-span-2"
        />

        {value.fuel === "electric" ? (
          <Field.Root name="batteryCapacity">
            <NumberField.Root
              value={value.batteryCapacity}
              onValueChange={(batteryCapacity) => patch({ batteryCapacity })}
              min={BATTERY_CAPACITY_LIMITS.min}
              max={BATTERY_CAPACITY_LIMITS.max}
              locale={locale}
              format={{ maximumFractionDigits: 0, useGrouping: false }}
              className={FIELD_ROOT}
            >
              <Field.Label className={fieldLabel()}>
                {t("batteryCapacity.label")}
              </Field.Label>
              <NumberField.Input
                placeholder={t("batteryCapacity.placeholder")}
                className={fieldControl()}
              />
            </NumberField.Root>
          </Field.Root>
        ) : (
          <Field.Root name="engineVolume">
            <NumberField.Root
              value={value.engineVolume}
              onValueChange={(engineVolume) => patch({ engineVolume })}
              min={engineVolumeLimits.min}
              max={engineVolumeLimits.max}
              locale={locale}
              format={{ maximumFractionDigits: 0, useGrouping: false }}
              className={FIELD_ROOT}
            >
              <Field.Label className={fieldLabel()}>
                {t("engineVolume.label")}
              </Field.Label>
              <NumberField.Input
                placeholder={t("engineVolume.placeholder")}
                className={fieldControl()}
              />
            </NumberField.Root>
          </Field.Root>
        )}

        <Field.Root name="year">
          <Select.Root<number | null>
            value={value.year}
            onValueChange={(year) =>
              patch({ year: typeof year === "number" ? year : null })
            }
          >
            <div className={FIELD_ROOT}>
              <Select.Label className={fieldLabel()}>
                {t("year.label")}
              </Select.Label>

              <Select.Trigger
                className={fieldControl({
                  className:
                    "flex cursor-pointer items-center justify-between gap-x-3 text-left data-popup-open:border-brand",
                })}
              >
                <Select.Value
                  placeholder={t("year.placeholder")}
                  className="data-placeholder:text-ink-muted/50"
                />
                <Select.Icon className="flex text-ink-muted">
                  <ChevronDown aria-hidden className="size-4" />
                </Select.Icon>
              </Select.Trigger>
            </div>

            <Select.Portal>
              <Select.Positioner sideOffset={4} className="z-40 outline-none">
                <Select.Popup className="max-h-[min(18rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-sm border border-line bg-white py-1 shadow-[0_12px_32px_--alpha(var(--color-night)/12%)] transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none">
                  <Select.List className="max-h-[inherit] overflow-y-auto">
                    {YEAR_OPTIONS.map((year) => (
                      <Select.Item
                        key={year}
                        value={year}
                        className="grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-x-2 px-4 py-2 font-mono text-body text-ink outline-none data-highlighted:bg-surface"
                      >
                        <Select.ItemIndicator className="col-start-1 flex text-brand">
                          <Check aria-hidden className="size-4" />
                        </Select.ItemIndicator>
                        <Select.ItemText className="col-start-2">
                          {year}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </Field.Root>

        <SegmentedField
          name="vehicle"
          label={t("vehicle.label")}
          options={VEHICLE_TYPES.map((item) => ({
            value: item,
            label: t(`vehicle.${item}`),
          }))}
          value={value.vehicle}
          onValueChange={(vehicle) => patch({ vehicle })}
          className="lg:col-span-2"
        />

        <AuctionField
          name="auction"
          label={t("auction.label")}
          value={value.auction}
          onValueChange={(auction) => patch({ auction })}
          className="lg:col-span-2"
        />

        <Field.Root name="lotPrice" className="lg:col-span-2">
          <NumberField.Root
            value={value.lotPrice}
            onValueChange={(lotPrice) => patch({ lotPrice })}
            min={LOT_PRICE_LIMITS.min}
            max={LOT_PRICE_LIMITS.max}
            locale={locale}
            format={{ maximumFractionDigits: 0 }}
            className={FIELD_ROOT}
          >
            <Field.Label className={fieldLabel()}>
              {t("lotPrice.label")}
            </Field.Label>
            <NumberField.Input
              placeholder={t("lotPrice.placeholder")}
              className={fieldControl()}
            />
          </NumberField.Root>
        </Field.Root>
      </div>
    </div>
  );
}
