import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

import type { FaqCategoryId } from "../../faqConfig";
import { faqRichTags } from "../../faqTags";

export function FaqCategory({
  id,
  index,
  questions,
}: {
  id: FaqCategoryId;
  index: number;
  questions: readonly string[];
}) {
  const t = useTranslations(`faqPage.categories.${id}`);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[calc(var(--header-h)+5rem)] lg:scroll-mt-[calc(var(--header-h)+2rem)]"
    >
      <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
        [{String(index + 1).padStart(2, "0")}]
      </p>

      <h2
        id={`${id}-title`}
        className="mt-2 font-logo text-h2 font-bold text-ink"
      >
        {t("title")}
      </h2>

      <p className="mt-3 mb-stack max-w-2xl text-body text-ink-muted">
        {t("description")}
      </p>

      <Accordion hiddenUntilFound className="border-t border-line">
        {questions.map((question) => (
          <AccordionItem
            key={question}
            value={question}
            className="border-b border-line"
          >
            <AccordionTrigger className="py-stack text-lead font-semibold text-ink transition-colors duration-200 hover:text-ink/65">
              {t(`questions.${question}.question`)}
            </AccordionTrigger>

            <AccordionContent className="max-w-3xl pb-stack text-body text-ink-muted">
              {t.rich(`questions.${question}.answer`, faqRichTags)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
