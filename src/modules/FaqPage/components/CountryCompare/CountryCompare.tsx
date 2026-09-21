import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LIGHT_CARD } from "@/modules/ServicesShared/cardStyles";
import { IMPORT_COUNTRIES } from "@/modules/ServicesShared/servicesConfig";

import { FAQ_COMPARE_COUNTRIES, FAQ_LINKS } from "../../faqConfig";

export function CountryCompare() {
  const t = useTranslations("faqPage.compare");
  const tServices = useTranslations("services");

  return (
    <section
      id="compare"
      aria-labelledby="compare-title"
      className="scroll-mt-[calc(var(--header-h)+5rem)] lg:scroll-mt-[calc(var(--header-h)+2rem)]"
    >
      <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <h3
        id="compare-title"
        className="mt-3 font-logo text-h3 font-bold text-ink"
      >
        {t("title")}
      </h3>

      <p className="mt-3 mb-stack max-w-2xl text-body text-ink-muted">
        {t("description")}
      </p>

      <ul className="grid gap-stack sm:grid-cols-2 xl:grid-cols-3">
        {FAQ_COMPARE_COUNTRIES.map((country) => {
          const { platforms, transport } = IMPORT_COUNTRIES[country];

          return (
            <li key={country}>
              <Link
                href={FAQ_LINKS[country]}
                className={cn(
                  LIGHT_CARD,
                  "group flex h-full flex-col p-block transition duration-300 ease-out hover:-translate-y-1 hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="font-logo text-lead font-bold text-ink">
                  {t(`countries.${country}.name`)}
                </span>

                <span className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-h2 font-bold text-brand">
                    {tServices(`${country}.hero.facts.term.title`)}
                  </span>
                  <span className="text-label text-ink-muted">{t("days")}</span>
                </span>

                <dl className="mt-stack flex flex-col">
                  <div className="flex flex-col gap-1 border-t border-line py-3">
                    <dt className="font-mono text-caption tracking-widest text-ink-muted uppercase">
                      {t("rows.transport")}
                    </dt>
                    <dd className="text-body font-semibold text-ink">
                      {t(`transport.${transport}`)}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-line py-3">
                    <dt className="font-mono text-caption tracking-widest text-ink-muted uppercase">
                      {t("rows.platforms")}
                    </dt>
                    <dd className="text-body font-semibold text-ink">
                      {platforms
                        .map((platform) =>
                          tServices(`platforms.${platform}.name`),
                        )
                        .join(", ")}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-line py-3">
                    <dt className="font-mono text-caption tracking-widest text-ink-muted uppercase">
                      {t("rows.bestFor")}
                    </dt>
                    <dd className="text-body text-ink">
                      {t(`countries.${country}.bestFor`)}
                    </dd>
                  </div>
                </dl>

                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-body font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                  {t("more")}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
