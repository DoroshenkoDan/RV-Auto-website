import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

function Section({
  tone = "light",
  className,
  children,
  ...props
}: ComponentProps<"section"> & {
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <section
      {...props}
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
  as: Heading = "h2",
  align = "start",
  spacing = "default",
  className,
  children,
}: {
  as?: "h1" | "h2";
  align?: "start" | "center";
  spacing?: "default" | "tight";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Heading
      className={cn(
        "font-logo text-h2 font-bold",
        align === "center" && "text-center",
        spacing === "tight" ? "mb-title-tight" : "mb-section-title",
        className,
      )}
    >
      {children}
    </Heading>
  );
}

export { Section, SectionTitle };
