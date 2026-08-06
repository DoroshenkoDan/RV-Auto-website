"use client"

import type { RefObject } from "react"
import { Field } from "@base-ui/react/field"
import { NumberField } from "@base-ui/react/number-field"

import { FIELD_CONTROL, FIELD_ERROR, FIELD_LABEL, FIELD_ROOT } from "../../styles"

export function AmountField({
  name,
  label,
  placeholder,
  value,
  onValueChange,
  min,
  max,
  locale,
  format,
  errors,
  actionsRef,
  className,
}: {
  name: string
  label: string
  placeholder: string
  value: number | null
  onValueChange: (value: number | null) => void
  min: number
  max: number
  locale: string
  format?: Intl.NumberFormatOptions
  errors: { valueMissing: string; rangeUnderflow: string; rangeOverflow: string }
  actionsRef?: RefObject<Field.Root.Actions | null>
  className?: string
}) {
  return (
    <Field.Root name={name} actionsRef={actionsRef} className={className}>
      <NumberField.Root
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        locale={locale}
        format={{ maximumFractionDigits: 0, ...format }}
        allowOutOfRange
        required
        className={FIELD_ROOT}
      >
        <Field.Label className={FIELD_LABEL}>{label}</Field.Label>
        <NumberField.Input placeholder={placeholder} className={FIELD_CONTROL} />
      </NumberField.Root>

      <Field.Error match="valueMissing" className={FIELD_ERROR}>
        {errors.valueMissing}
      </Field.Error>
      <Field.Error match="rangeUnderflow" className={FIELD_ERROR}>
        {errors.rangeUnderflow}
      </Field.Error>
      <Field.Error match="rangeOverflow" className={FIELD_ERROR}>
        {errors.rangeOverflow}
      </Field.Error>
    </Field.Root>
  )
}
