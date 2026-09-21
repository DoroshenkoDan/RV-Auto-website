"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type FaqNavItem = { id: string; label: string };

export function FaqNav({
  items,
  label,
  className,
}: {
  items: readonly FaqNavItem[];
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);

    if (!list || !link || list.scrollWidth <= list.clientWidth) {
      return;
    }

    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-(--header-h) z-30 -mx-6 border-b border-line bg-canvas/95 backdrop-blur-md lg:top-[calc(var(--header-h)+2rem)] lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none",
        className,
      )}
    >
      <p className="hidden font-mono text-caption font-bold tracking-[0.18em] text-ink-muted uppercase lg:block">
        {label}
      </p>

      <ul
        ref={listRef}
        className="flex [scrollbar-width:none] gap-2 overflow-x-auto px-6 py-3 lg:mt-stack lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:p-0"
      >
        {items.map(({ id, label: itemLabel }, index) => {
          const isActive = id === active;

          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                data-id={id}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-label font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none",
                  "lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2.5 lg:whitespace-normal",
                  isActive
                    ? "border-brand bg-brand text-night lg:border-brand lg:bg-transparent lg:text-ink"
                    : "border-line text-ink-muted hover:text-ink lg:border-transparent",
                )}
              >
                <span
                  className={cn(
                    "hidden font-mono text-caption lg:inline",
                    isActive ? "text-brand" : "text-ink-muted/60",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {itemLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
