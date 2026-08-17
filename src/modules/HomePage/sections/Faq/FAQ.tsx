import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { buttonVariants } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";

const questionIds = [
  "customs",
  "turnkey",
  "damage",
  "inspection",
  "lostBid",
  "delivery",
  "payments",
] as const;

export default function FAQ() {
  const t = useTranslations("homePage.faq");

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      <Accordion
        defaultValue={[questionIds[0]]}
        className="mx-auto max-w-4xl border-t border-line"
      >
        {questionIds.map((id) => (
          <AccordionItem key={id} value={id} className="border-b border-line">
            <AccordionTrigger className="py-stack text-lead font-semibold text-ink transition-colors duration-200 hover:text-ink/65">
              {t(`questions.${id}.question`)}
            </AccordionTrigger>

            <AccordionContent className="max-w-3xl pb-stack text-body text-ink-muted">
              {t(`questions.${id}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mx-auto mt-section-title flex max-w-4xl flex-col items-center gap-stack">
        <span className="text-body text-ink-muted">{t("ctaLabel")}</span>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link href="/contacts" className={buttonVariants()}>
            {t("ctaContact")}
          </Link>

          <Link href="/faq" className={buttonVariants({ variant: "outline" })}>
            {t("ctaAll")}
          </Link>
        </div>
      </div>
    </Section>
  );
}
