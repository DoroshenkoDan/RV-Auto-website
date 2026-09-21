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

import type { ServiceKey } from "../../servicesConfig";

export function ServiceFaq({
  service,
  questions,
}: {
  service: ServiceKey;
  questions: readonly string[];
}) {
  const t = useTranslations(`services.${service}.faq`);
  const tFaq = useTranslations("services.faq");

  return (
    <Section>
      <SectionTitle align="center">{tFaq("title")}</SectionTitle>

      <Accordion
        defaultValue={[questions[0]]}
        className="mx-auto max-w-4xl border-t border-line"
      >
        {questions.map((id) => (
          <AccordionItem key={id} value={id} className="border-b border-line">
            <AccordionTrigger className="py-stack text-lead font-semibold text-ink transition-colors duration-200 hover:text-ink/65">
              {t(`${id}.question`)}
            </AccordionTrigger>

            <AccordionContent className="max-w-3xl pb-stack text-body text-ink-muted">
              {t(`${id}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-section-title flex justify-center">
        <Link href="/faq" className={buttonVariants({ variant: "outline" })}>
          {tFaq("all")}
        </Link>
      </div>
    </Section>
  );
}
