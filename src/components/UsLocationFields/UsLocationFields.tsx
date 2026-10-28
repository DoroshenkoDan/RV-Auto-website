"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  getUsCities,
  getUsStates,
  type UsAuction,
} from "@/lib/calculator/usAuctions";
import { FIELD_ROOT, fieldControl, fieldLabel } from "@/ui/field";

function LocationSelect({
  name,
  label,
  emptyLabel,
  options,
  value,
  onValueChange,
  disabled,
  className,
}: {
  name: string;
  label: string;
  emptyLabel: string;
  options: string[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Field.Root name={name} disabled={disabled} className={className}>
      <Select.Root<string | null>
        value={value}
        onValueChange={(next) => onValueChange(next ?? null)}
        disabled={disabled}
      >
        <div className={FIELD_ROOT}>
          <Select.Label className={fieldLabel()}>{label}</Select.Label>

          <Select.Trigger
            className={fieldControl({
              className:
                "flex cursor-pointer items-center justify-between gap-x-3 text-left data-popup-open:border-brand data-disabled:cursor-not-allowed data-disabled:opacity-50",
            })}
          >
            <Select.Value
              placeholder={emptyLabel}
              className="truncate data-placeholder:text-ink-muted/50"
            />
            <Select.Icon className="flex text-ink-muted">
              <ChevronDown aria-hidden className="size-4" />
            </Select.Icon>
          </Select.Trigger>
        </div>

        <Select.Portal>
          <Select.Positioner
            sideOffset={4}
            alignItemWithTrigger={false}
            className="z-40 outline-none"
          >
            <Select.Popup className="max-h-[min(18rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-sm border border-line bg-white py-1 shadow-[0_12px_32px_--alpha(var(--color-night)/12%)] transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none">
              <Select.List className="max-h-[inherit] overflow-y-auto">
                {[null, ...options].map((option) => (
                  <Select.Item
                    key={option ?? ""}
                    value={option}
                    className="grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-x-2 px-4 py-2 text-body text-ink outline-none data-highlighted:bg-surface"
                  >
                    <Select.ItemIndicator className="col-start-1 flex text-brand">
                      <Check aria-hidden className="size-4" />
                    </Select.ItemIndicator>
                    <Select.ItemText
                      className={
                        option === null
                          ? "col-start-2 text-ink-muted"
                          : "col-start-2"
                      }
                    >
                      {option ?? emptyLabel}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}

export function UsLocationFields({
  auction,
  state,
  city,
  onValueChange,
}: {
  auction: UsAuction;
  state: string | null;
  city: string | null;
  onValueChange: (location: {
    state: string | null;
    city: string | null;
  }) => void;
}) {
  const t = useTranslations("homePage.calculator.form");

  return (
    <>
      <LocationSelect
        name="state"
        label={t("state.label")}
        emptyLabel={t("state.any")}
        options={getUsStates(auction)}
        value={state}
        onValueChange={(next) => onValueChange({ state: next, city: null })}
      />

      <LocationSelect
        name="city"
        label={t("city.label")}
        emptyLabel={t("city.any")}
        options={state === null ? [] : getUsCities(auction, state)}
        value={city}
        onValueChange={(next) => onValueChange({ state, city: next })}
        disabled={state === null}
      />
    </>
  );
}
