"use client";

import type { ComponentProps } from "react";
import { Phone } from "lucide-react";

import { cn } from "@/lib/utils";

export function CallbackButton({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-brand text-night shadow-[0_0_24px_--alpha(var(--color-neon)/45%)] transition duration-300 ease-out hover:scale-110 hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-95 motion-reduce:transition-none sm:size-16",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand/50 motion-safe:animate-ping"
      />

      <Phone
        aria-hidden
        className="relative size-6 transition-transform duration-300 ease-out group-hover:-rotate-12 motion-reduce:transition-none sm:size-7"
      />
    </button>
  );
}
