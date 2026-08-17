import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import type { HeroSlide } from "../../types";

const UNIT = "clamp(0.5625rem, 0.3rem + 0.75vh, 0.6875rem)";

export function HeroProgress({
  slides,
  active,
  cycle,
  label,
  onSelect,
  className,
}: {
  slides: Pick<HeroSlide, "key" | "label">[];
  active: number;
  cycle: number;
  label: string;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      style={{ "--hero-progress-unit": UNIT } as CSSProperties}
      className={cn("flex gap-x-(--hero-progress-unit)", className)}
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        const isPast = index < active;

        return (
          <button
            key={slide.key}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "true" : undefined}
            className="group flex cursor-pointer flex-col items-center gap-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <span className="block h-0.5 w-[calc(var(--hero-progress-unit)*4)] overflow-hidden bg-sand/18">
              {isPast && <span className="block size-full bg-brand/45" />}

              {isActive && (
                <span
                  key={cycle}
                  className="block size-full origin-left animate-hero-progress bg-brand motion-reduce:animate-none"
                />
              )}
            </span>

            <span
              className={cn(
                "font-mono text-(length:--hero-progress-unit) leading-none tracking-widest uppercase transition-colors duration-300",
                isActive && "text-sand",
                isPast && "text-sand/60",
                !isActive && !isPast && "text-sand/28 group-hover:text-sand/60",
              )}
            >
              {slide.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
