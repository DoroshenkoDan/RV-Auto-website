import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const FIELD_ROOT = "flex flex-col gap-y-2";

const FIELD_ERROR = "text-[13px] leading-normal text-destructive";

// Reserves the error line so the layout does not shift when a message appears.
const FIELD_ERROR_SLOT = "h-6 pt-1";

const labelStyles = cva("text-[13px] leading-normal font-medium", {
  variants: {
    tone: { light: "text-ink-muted", dark: "text-sand/60" },
  },
  defaultVariants: { tone: "light" },
});

const controlStyles = cva(
  "h-12 w-full rounded-sm border px-4 font-mono text-[15px] leading-normal transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand data-invalid:border-destructive 2xl:h-13",
  {
    variants: {
      tone: {
        light: "border-line bg-white text-ink placeholder:text-ink-muted/50",
        dark: "border-sand/12 bg-night-soft text-sand placeholder:text-sand/40",
      },
    },
    defaultVariants: { tone: "light" },
  },
);

// Layout stays with the caller: the group is a wrapping grid in one place and a
// single row in the other.
const segmentedGroupStyles = cva("gap-1 rounded-sm border p-1.25", {
  variants: {
    tone: {
      light: "border-line bg-surface",
      dark: "border-sand/12 bg-night-soft",
    },
  },
  defaultVariants: { tone: "light" },
});

const segmentedItemStyles = cva(
  "flex cursor-pointer items-center justify-center rounded-[4px] text-center text-sm leading-normal transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand data-checked:bg-brand data-checked:font-semibold data-checked:text-night-soft data-checked:hover:text-night-soft",
  {
    variants: {
      tone: {
        light: "text-ink-muted hover:text-ink",
        dark: "text-sand/60 hover:text-sand",
      },
    },
    defaultVariants: { tone: "light" },
  },
);

type FieldStyle = { tone?: "light" | "dark"; className?: string };

// cva concatenates without resolving conflicts, so every caller goes through cn().
function fieldLabel({ className, ...variants }: FieldStyle = {}) {
  return cn(labelStyles(variants), className);
}

function fieldControl({ className, ...variants }: FieldStyle = {}) {
  return cn(controlStyles(variants), className);
}

function segmentedGroup({ className, ...variants }: FieldStyle = {}) {
  return cn(segmentedGroupStyles(variants), className);
}

function segmentedItem({ className, ...variants }: FieldStyle = {}) {
  return cn(segmentedItemStyles(variants), className);
}

export {
  FIELD_ERROR,
  FIELD_ERROR_SLOT,
  FIELD_ROOT,
  fieldControl,
  fieldLabel,
  segmentedGroup,
  segmentedItem,
};
