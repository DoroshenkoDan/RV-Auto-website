import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

const CHAPTERS = ["past", "present"] as const;

export function AboutStory() {
  const t = useTranslations("aboutPage.story");

  return (
    <Section>
      <SectionTitle className="max-w-3xl">{t("title")}</SectionTitle>

      <div className="grid gap-section-title lg:grid-cols-2">
        {CHAPTERS.map((chapter) => (
          <article key={chapter}>
            <h3 className="font-logo text-h3 font-bold text-ink">
              {t(`${chapter}.title`)}
            </h3>

            <hr className="my-stack border-line" />

            <p className="text-body text-ink-muted">{t(`${chapter}.body1`)}</p>
            <p className="mt-title-tight text-body text-ink-muted">
              {t(`${chapter}.body2`)}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
