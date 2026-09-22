"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Field } from "@base-ui/react/field";
import { Fieldset } from "@base-ui/react/fieldset";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FIELD_ROOT, fieldLabel } from "@/ui/field";

const groupStyles = cva(
  "relative flex max-w-full scrollbar-none gap-1 overflow-x-auto overscroll-x-contain rounded-sm border p-1.25",
  {
    variants: {
      tone: {
        light: "border-line bg-surface",
        dark: "border-sand/12 bg-night-soft",
      },
      size: {
        default: "h-control",
        sm: "h-control-sm",
      },
      stretch: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: { tone: "light", size: "default", stretch: false },
  },
);

const itemStyles = cva(
  "flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] px-4 text-center text-body whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand data-checked:bg-brand data-checked:font-semibold data-checked:text-night-soft data-checked:hover:text-night-soft",
  {
    variants: {
      tone: {
        light: "text-ink-muted hover:text-ink",
        dark: "text-sand/60 hover:text-sand",
      },
      stretch: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: { tone: "light", stretch: false },
  },
);

type SegmentedOption<Value extends string> = {
  value: Value;
  label: ReactNode;
};

type SegmentedControlProps<Value extends string> = Omit<
  RadioGroup.Props<Value>,
  "className" | "children"
> &
  VariantProps<typeof groupStyles> & {
    options: readonly SegmentedOption<Value>[];
    className?: string;
  };

function SegmentedControl<Value extends string>({
  options,
  tone,
  size,
  stretch,
  value,
  className,
  ...props
}: SegmentedControlProps<Value>) {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    const item = group?.querySelector<HTMLElement>("[data-checked]");

    if (!group || !item || group.scrollWidth <= group.clientWidth) {
      return;
    }

    group.scrollTo({
      left: item.offsetLeft - (group.clientWidth - item.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [value]);

  return (
    <RadioGroup<Value>
      ref={groupRef}
      value={value}
      className={cn(groupStyles({ tone, size, stretch }), className)}
      {...props}
    >
      {options.map((option) => (
        <Radio.Root
          key={option.value}
          value={option.value}
          className={itemStyles({ tone, stretch })}
        >
          {option.label}
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}

function SegmentedField<Value extends string>({
  name,
  label,
  className,
  ...props
}: Omit<SegmentedControlProps<Value>, "name"> & {
  name: string;
  label: string;
}) {
  const legendId = useId();

  return (
    <Field.Root name={name} className={cn("min-w-0", className)}>
      <Fieldset.Root className={cn(FIELD_ROOT, "min-w-0")}>
        <Fieldset.Legend id={legendId} className={fieldLabel()}>
          {label}
        </Fieldset.Legend>
        <SegmentedControl<Value>
          aria-labelledby={legendId}
          stretch
          {...props}
        />
      </Fieldset.Root>
    </Field.Root>
  );
}

export { SegmentedControl, SegmentedField };
