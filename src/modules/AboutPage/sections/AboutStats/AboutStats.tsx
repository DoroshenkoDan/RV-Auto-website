import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

const STATS = ["experience", "cars", "markets", "term"] as const;

export function AboutStats() {
  const t = useTranslations("aboutPage.stats");

  return (
    <Section tone="dark">
      <SectionTitle>{t("title")}</SectionTitle>

      <ul className="grid grid-cols-2 gap-stack lg:grid-cols-4">
        {STATS.map((stat) => (
          <li
            key={stat}
            className="rounded-lg border border-brand/12 bg-brand/10 p-block"
          >
            <p className="font-logo text-stat font-bold text-brand">
              {t(`items.${stat}.value`)}
            </p>
            <p className="mt-title-tight text-body font-bold text-sand">
              {t(`items.${stat}.label`)}
            </p>
            <p className="mt-1.5 text-label text-sand/60">
              {t(`items.${stat}.note`)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
