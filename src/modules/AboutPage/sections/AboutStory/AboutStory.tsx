import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

const CHAPTERS = ["past", "present"] as const;

export function AboutStory() {
  const t = useTranslations("aboutPage.story");

  return (
    <Section>
      <SectionTitle className="max-w-3xl">{t("title")}</SectionTitle>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 2xl:gap-16">
        {CHAPTERS.map((chapter) => (
          <article key={chapter}>
            <h3 className="font-logo text-lg font-bold text-ink lg:text-xl">
              {t(`${chapter}.title`)}
            </h3>

            <hr className="my-5 border-line" />

            <p className="text-[15px] leading-[1.65] text-ink-muted">
              {t(`${chapter}.body1`)}
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
              {t(`${chapter}.body2`)}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
