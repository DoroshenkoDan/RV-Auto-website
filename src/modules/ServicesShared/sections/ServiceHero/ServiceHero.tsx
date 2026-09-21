import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/ui/button";
import { Section } from "@/ui/section";

import type { ServiceKey } from "../../servicesConfig";

export function ServiceHero({
  service,
  secondaryAction,
  children,
}: {
  service: ServiceKey;
  secondaryAction: "catalog" | "compare";
  children: ReactNode;
}) {
  const t = useTranslations(`services.${service}.hero`);
  const tHero = useTranslations("services.hero");
  const secondaryClass = buttonVariants({
    variant: "outlineOnDark",
    size: "lg",
  });

  return (
    <Section
      data-page-hero
      tone="dark"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+var(--spacing-section))]"
    >
      <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <h1 className="mt-stack max-w-4xl font-logo text-h1 font-bold text-sand">
        {t("title")}
      </h1>

      <p className="mt-stack max-w-2xl text-lead text-sand/70">{t("lede")}</p>

      <div className="mt-block flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link href="/contacts" className={buttonVariants({ size: "lg" })}>
          {tHero("request")}
        </Link>

        {secondaryAction === "catalog" ? (
          <Link href="/cars" className={secondaryClass}>
            {tHero("catalog")}
          </Link>
        ) : (
          <a href="#compare" className={secondaryClass}>
            {tHero("compare")}
          </a>
        )}
      </div>

      <div className="mt-section-title lg:relative">
        <Image
          src="/images/shared/AbstractCar.webp"
          alt=""
          width={2172}
          height={724}
          loading="eager"
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="pointer-events-none absolute right-0 bottom-0 -z-10 w-full max-w-5xl translate-x-[12%] opacity-10 select-none lg:bottom-full lg:w-3/5 lg:opacity-20"
        />

        <div className="border-t border-sand/15 pt-stack">{children}</div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
