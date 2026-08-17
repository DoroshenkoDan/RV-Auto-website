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
        "py-section",
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
        "font-logo text-h2 font-bold",
        align === "center" && "text-center",
        spacing === "tight" ? "mb-title-tight" : "mb-section-title",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export { Section, SectionTitle };
