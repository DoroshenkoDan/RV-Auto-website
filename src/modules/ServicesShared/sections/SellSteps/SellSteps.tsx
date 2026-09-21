import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/ui/section";

import { LIGHT_CARD } from "../../cardStyles";
import type { SellService, SellStep } from "../../servicesConfig";

function LinkLabel({ text }: { text: string }) {
  const lastSpace = text.lastIndexOf(" ");

  return (
    <>
      {text.slice(0, lastSpace + 1)}
      <span className="whitespace-nowrap">
        {text.slice(lastSpace + 1)}
        <ArrowRight
          aria-hidden
          className="ml-2 inline size-4 align-[-0.125em] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
    </>
  );
}

export function SellSteps({
  service,
  steps,
}: {
  service: SellService;
  steps: readonly SellStep[];
}) {
  const t = useTranslations(`services.${service}.steps`);

  return (
    <Section>
      <SectionTitle>{t("title")}</SectionTitle>

      <ol
        className={cn(
          "grid gap-stack sm:grid-cols-2",
          steps.length === 5
            ? "lg:grid-cols-3 xl:grid-cols-5"
            : "lg:grid-cols-4",
        )}
      >
        {steps.map(({ id, href }, index) => (
          <li key={id} className={cn(LIGHT_CARD, "flex flex-col p-block")}>
            <span className="font-mono text-label font-bold tracking-widest text-brand">
              [{index + 1}]
            </span>

            <h3 className="mt-stack text-h3 font-bold text-ink">
              {t(`items.${id}.title`)}
            </h3>

            <p className="mt-title-tight text-body text-ink-muted">
              {t(`items.${id}.description`)}
            </p>

            {href && (
              <Link
                href={href}
                className="group mt-auto block w-fit pt-stack text-body font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <LinkLabel text={t(`items.${id}.link`)} />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
