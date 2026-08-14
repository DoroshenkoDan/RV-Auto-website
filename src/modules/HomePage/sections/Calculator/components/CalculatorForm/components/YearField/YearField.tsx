"use client"

import { Field } from "@base-ui/react/field"
import { Select } from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { FIELD_CONTROL, FIELD_ERROR, FIELD_LABEL, FIELD_ROOT } from "../../styles"

export function YearField({
  name,
  label,
  placeholder,
  years,
  value,
  onValueChange,
  error,
  className,
}: {
  name: string
  label: string
  placeholder: string
  years: number[]
  value: number | null
  onValueChange: (value: number | null) => void
  error: string
  className?: string
}) {
  return (
    <Field.Root name={name} className={className}>
      <Select.Root<number | null>
        value={value}
        onValueChange={(next) =>
          onValueChange(typeof next === "number" ? next : null)
        }
        required
      >
        <div className={FIELD_ROOT}>
          <Select.Label className={FIELD_LABEL}>{label}</Select.Label>

          <div className="relative">
            <Select.Trigger
              className={cn(
                FIELD_CONTROL,
                "flex cursor-pointer items-center justify-between gap-x-3 text-left data-popup-open:border-brand",
              )}
            >
              <Select.Value
                placeholder={placeholder}
                className="data-placeholder:text-ink-muted/50"
              />
              <Select.Icon className="flex text-ink-muted">
                <ChevronDown aria-hidden className="size-4" />
              </Select.Icon>
            </Select.Trigger>
          </div>
        </div>

        <Select.Portal>
          <Select.Positioner sideOffset={4} className="z-40 outline-none">
            <Select.Popup className="max-h-[min(18rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-sm border border-line bg-white py-1 shadow-[0_12px_32px_--alpha(var(--color-night)/12%)] transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none">
              <Select.List className="max-h-[inherit] overflow-y-auto">
                {years.map((year) => (
                  <Select.Item
                    key={year}
                    value={year}
                    className="grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-x-2 px-4 py-2 font-mono text-[15px] leading-normal text-ink outline-none data-highlighted:bg-surface"
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

      <Field.Error match="valueMissing" className={FIELD_ERROR}>
        {error}
      </Field.Error>
    </Field.Root>
  )
}
