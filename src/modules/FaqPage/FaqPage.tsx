import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";
import { Section } from "@/ui/section";

import { CostExample } from "./components/CostExample";
import { CountryCompare } from "./components/CountryCompare";
import { FaqCategory } from "./components/FaqCategory";
import { FaqNav } from "./components/FaqNav";
import { FAQ_CATEGORIES, type FaqCategoryId } from "./faqConfig";
import { faqPlainTags } from "./faqTags";
import { FaqHero } from "./sections/FaqHero";

const CATEGORY_INSERTS: Partial<Record<FaqCategoryId, ReactNode>> = {
  cost: <CostExample />,
  delivery: <CountryCompare />,
};

export function FaqPage() {
  const t = useTranslations("faqPage");

  const questionCount = FAQ_CATEGORIES.reduce(
    (sum, { questions }) => sum + questions.length,
    0,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap(({ id, questions }) =>
      questions.map((question) => ({
        "@type": "Question",
        name: t(`categories.${id}.questions.${question}.question`),
        acceptedAnswer: {
          "@type": "Answer",
          text: t.markup(
            `categories.${id}.questions.${question}.answer`,
            faqPlainTags,
          ),
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <FaqHero
        questionCount={questionCount}
        categoryCount={FAQ_CATEGORIES.length}
      />

      <Section className="pt-0 lg:pt-section">
        <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-block xl:grid-cols-[18rem_1fr]">
          <FaqNav
            label={t("navLabel")}
            items={FAQ_CATEGORIES.map(({ id }) => ({
              id,
              label: t(`categories.${id}.title`),
            }))}
          />

          <div className="mt-block flex min-w-0 flex-col gap-section lg:mt-0">
            {FAQ_CATEGORIES.map(({ id, questions }, index) => (
              <div key={id} className="flex flex-col gap-section">
                <FaqCategory id={id} index={index} questions={questions} />
                {CATEGORY_INSERTS[id]}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection title={t("cta.title")} description={t("cta.description")} />
    </>
  );
}
