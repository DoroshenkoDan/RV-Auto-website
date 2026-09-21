import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/ui/section";

import { LIGHT_CARD } from "../../cardStyles";
import type { ServiceKey } from "../../servicesConfig";

export function ServiceFeatures({
  service,
  features,
}: {
  service: ServiceKey;
  features: readonly string[];
}) {
  const t = useTranslations(`services.${service}.features`);

  return (
    <Section className="bg-surface">
      <SectionTitle>{t("title")}</SectionTitle>

      <ul
        className={cn(
          "grid gap-stack sm:grid-cols-2",
          features.length === 3 ? "lg:grid-cols-3" : "xl:grid-cols-4",
        )}
      >
        {features.map((id, index) => (
          <li key={id} className={cn(LIGHT_CARD, "flex flex-col p-block")}>
            <span className="font-mono text-label font-bold tracking-widest text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-stack text-h3 font-bold text-ink">
              {t(`items.${id}.title`)}
            </h3>

            <p className="mt-title-tight text-body text-ink-muted">
              {t(`items.${id}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
