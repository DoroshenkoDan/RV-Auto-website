"use client"

import { Field } from "@base-ui/react/field"
import { Fieldset } from "@base-ui/react/fieldset"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

import { FIELD_LABEL, FIELD_ROOT } from "../../styles"

export function SegmentedField<Value extends string>({
  name,
  label,
  options,
  value,
  onValueChange,
  className,
}: {
  name: string
  label: string
  options: { value: Value; label: string }[]
  value: Value
  onValueChange: (value: Value) => void
  className?: string
}) {
  return (
    <Field.Root name={name} className={className}>
      <Fieldset.Root
        render={
          <RadioGroup<Value>
            value={value}
            onValueChange={onValueChange}
            className={FIELD_ROOT}
          />
        }
      >
        <Fieldset.Legend className={FIELD_LABEL}>{label}</Fieldset.Legend>

        <div className="grid grid-cols-2 gap-1 rounded-sm border border-line bg-surface p-1.25 lg:flex">
          {options.map((option) => (
            <Radio.Root
              key={option.value}
              value={option.value}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-[4px] py-2 text-center text-sm leading-normal text-ink-muted transition-colors duration-200 2xl:py-[10.5px]",
                "hover:text-ink data-checked:bg-brand data-checked:font-semibold data-checked:text-night-soft data-checked:hover:text-night-soft",
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                "lg:flex-1",
              )}
            >
              {option.label}
            </Radio.Root>
          ))}
        </div>
      </Fieldset.Root>
    </Field.Root>
  )
}
