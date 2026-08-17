import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

const STATS = ["experience", "cars", "markets", "term"] as const;

export function AboutStats() {
  const t = useTranslations("aboutPage.stats");

  return (
    <Section tone="dark">
      <SectionTitle>{t("title")}</SectionTitle>

      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat) => (
          <li
            key={stat}
            className="rounded-lg border border-brand/12 bg-brand/10 p-6 lg:p-8"
          >
            <p className="font-logo text-3xl leading-none font-bold text-brand lg:text-4xl">
              {t(`items.${stat}.value`)}
            </p>
            <p className="mt-4 text-[15px] font-bold text-sand">
              {t(`items.${stat}.label`)}
            </p>
            <p className="mt-2 text-sm leading-normal text-sand/60">
              {t(`items.${stat}.note`)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
