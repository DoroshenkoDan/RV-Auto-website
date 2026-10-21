import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";

import { cn } from "@/lib/utils";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = cn(
  unbounded.variable,
  manrope.variable,
  jetBrainsMono.variable,
);
