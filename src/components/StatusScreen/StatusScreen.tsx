import type { ReactNode } from "react";
import Image from "next/image";

export function StatusScreen({
  eyebrow,
  titleLead,
  titleAccent,
  description,
  children,
}: {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      data-page-hero
      className="relative isolate flex min-h-svh flex-col items-center justify-center-safe overflow-hidden bg-night pt-[calc(var(--header-h)+var(--spacing-section))] pb-section text-center"
    >
      <div className="page-shell flex flex-col items-center gap-y-stack">
        <p className="font-mono text-label font-bold tracking-[0.18em] text-brand uppercase">
          [{eyebrow}]
        </p>

        <div className="relative w-[clamp(16rem,21vw+11vh,34rem)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 m-auto aspect-square rounded-full bg-brand/12 blur-2xl"
          />

          <Image
            src="/images/shared/car404.webp"
            alt=""
            width={1672}
            height={941}
            priority
            className="h-auto w-full"
          />
        </div>

        <h1 className="max-w-3xl font-logo text-h1 font-bold text-balance text-sand">
          {titleLead}{" "}
          <span className="text-brand underline decoration-[0.05em] underline-offset-[0.14em]">
            {titleAccent}
          </span>
        </h1>

        <p className="max-w-md text-lead text-pretty text-sand/70">
          {description}
        </p>

        <div className="mt-block flex flex-col items-center gap-4 sm:flex-row">
          {children}
        </div>
      </div>
    </section>
  );
}
