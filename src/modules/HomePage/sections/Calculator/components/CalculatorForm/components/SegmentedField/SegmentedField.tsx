"use client";

import { Field } from "@base-ui/react/field";
import { Fieldset } from "@base-ui/react/fieldset";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";

import {
  FIELD_ROOT,
  fieldLabel,
  segmentedGroup,
  segmentedItem,
} from "@/ui/field";

export function SegmentedField<Value extends string>({
  name,
  label,
  options,
  value,
  onValueChange,
  className,
}: {
  name: string;
  label: string;
  options: { value: Value; label: string }[];
  value: Value;
  onValueChange: (value: Value) => void;
  className?: string;
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
        <Fieldset.Legend className={fieldLabel()}>{label}</Fieldset.Legend>

        <div
          className={segmentedGroup({
            className: "grid grid-cols-2 lg:flex",
          })}
        >
          {options.map((option) => (
            <Radio.Root
              key={option.value}
              value={option.value}
              className={segmentedItem({
                className: "py-2.5 lg:flex-1",
              })}
            >
              {option.label}
            </Radio.Root>
          ))}
        </div>
      </Fieldset.Root>
    </Field.Root>
  );
}
