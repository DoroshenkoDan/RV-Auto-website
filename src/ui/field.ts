import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const FIELD_ROOT = "flex flex-col gap-y-2";

const FIELD_ERROR = "text-label text-destructive";

const FIELD_ERROR_SLOT = "min-h-7 pt-1";

const labelStyles = cva("text-label font-medium", {
  variants: {
    tone: { light: "text-ink-muted", dark: "text-sand/60" },
  },
  defaultVariants: { tone: "light" },
});

const controlStyles = cva(
  "h-control w-full rounded-sm border px-4 font-mono text-body transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand data-invalid:border-destructive",
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

type FieldStyle = { tone?: "light" | "dark"; className?: string };

function fieldLabel({ className, ...variants }: FieldStyle = {}) {
  return cn(labelStyles(variants), className);
}

function fieldControl({ className, ...variants }: FieldStyle = {}) {
  return cn(controlStyles(variants), className);
}

export { FIELD_ERROR, FIELD_ERROR_SLOT, FIELD_ROOT, fieldControl, fieldLabel };
