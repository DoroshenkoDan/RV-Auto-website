import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/ui/section";

import { LIGHT_CARD } from "../../cardStyles";
import {
  SELL_COMPARE_ROWS,
  SELL_SERVICES,
  type SellService,
} from "../../servicesConfig";

const SERVICES: readonly SellService[] = ["buyout", "consignment"];

export function SellCompare({ current }: { current: SellService }) {
  const t = useTranslations("services.sellCompare");

  return (
    <Section id="compare" className="scroll-mt-(--header-h) bg-surface">
      <SectionTitle align="center">{t("title")}</SectionTitle>

      <div className="mx-auto grid max-w-5xl gap-stack md:grid-cols-2">
        {SERVICES.map((service) => {
          const isCurrent = service === current;
          const content = (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-logo text-h3 font-bold text-ink">
                  {t(`services.${service}`)}
                </h3>

                {isCurrent && (
                  <span className="rounded-sm bg-brand px-2.5 py-1 font-mono text-caption font-bold tracking-widest text-night-soft uppercase">
                    {t("current")}
                  </span>
                )}
              </div>

              <dl className="mt-stack flex flex-col">
                {SELL_COMPARE_ROWS.map((row) => (
                  <div
                    key={row}
                    className={cn(
                      "flex flex-col gap-1 border-t py-3",
                      isCurrent ? "border-brand/25" : "border-line",
                    )}
                  >
                    <dt className="font-mono text-caption tracking-widest text-ink-muted uppercase">
                      {t(`rows.${row}.label`)}
                    </dt>
                    <dd className="text-body font-semibold text-ink">
                      {t(`rows.${row}.${service}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          );

          if (isCurrent) {
            return (
              <article
                key={service}
                className="flex flex-col rounded-lg border-2 border-brand bg-brand/10 p-block"
              >
                {content}
              </article>
            );
          }

          return (
            <Link
              key={service}
              href={SELL_SERVICES[service].href}
              className={cn(
                LIGHT_CARD,
                "group flex flex-col p-block transition duration-300 ease-out hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-16px_--alpha(var(--color-night)/28%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              )}
            >
              {content}

              <span className="mt-auto inline-flex items-center gap-2 pt-stack text-body font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                {t(`cta.${service}`)}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
