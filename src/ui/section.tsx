import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function Section({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "py-16 lg:py-20 2xl:py-24",
        tone === "dark" ? "bg-night text-sand" : "bg-canvas text-ink",
        className,
      )}
    >
      <div className="page-shell">{children}</div>
    </section>
  );
}

function SectionTitle({
  align = "start",
  spacing = "default",
  className,
  children,
}: {
  align?: "start" | "center";
  spacing?: "default" | "tight";
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "font-logo text-2xl leading-tight font-bold lg:text-3xl 2xl:text-4xl",
        align === "center" && "text-center",
        spacing === "tight" ? "mb-4 lg:mb-5" : "mb-8 lg:mb-10 2xl:mb-12",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export { Section, SectionTitle };
