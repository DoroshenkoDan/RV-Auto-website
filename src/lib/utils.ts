import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const TEXT_SIZES = [
  "micro",
  "caption",
  "label",
  "body",
  "lead",
  "h3",
  "h2",
  "h1",
  "hero",
  "stat",
  "display",
  "nav",
  "control",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: TEXT_SIZES }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}
