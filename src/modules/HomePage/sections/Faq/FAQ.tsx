import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

interface Props {
  className?: string;
}

const questionIds = [
  "customs",
  "turnkey",
  "damage",
  "inspection",
  "lostBid",
  "delivery",
  "payments",
] as const;

export default function FAQ({ className = "" }: Props) {
  const t = useTranslations("homePage.faq");

  return (
    <section className={cn("bg-canvas py-16 lg:py-20 2xl:py-24", className)}>
      <div className="page-shell">
        <h2 className="mb-8 text-2xl leading-tight font-bold text-ink lg:mb-10 lg:text-3xl 2xl:mb-12 2xl:text-4xl font-logo">
          {t("title")}
        </h2>

        <Accordion
          defaultValue={[questionIds[0]]}
          className="mx-auto max-w-4xl border-t border-line"
        >
          {questionIds.map((id) => (
            <AccordionItem key={id} value={id} className="border-b border-line">
              <AccordionTrigger className="py-5 text-[15px] leading-normal font-semibold text-ink transition-colors duration-200 hover:text-ink/65 lg:py-6 lg:text-base">
                {t(`questions.${id}.question`)}
              </AccordionTrigger>

              <AccordionContent className="max-w-3xl pb-6 text-[15px] leading-normal text-ink-muted lg:pb-7">
                {t(`questions.${id}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 lg:mt-12">
          <span className="text-[15px] leading-normal text-ink-muted">
            {t("ctaLabel")}
          </span>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/contacts"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-brand px-8 text-base leading-normal font-semibold text-night-soft transition-colors duration-200 hover:bg-brand/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98] motion-reduce:transition-none 2xl:h-14"
            >
              {t("ctaContact")}
            </Link>

            <Link
              href="/faq"
              className="inline-flex h-12 items-center justify-center rounded-sm border-2 border-night-soft px-8 text-base leading-normal font-semibold text-night-soft transition-colors duration-200 hover:border-night-soft/30 hover:bg-night-soft/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98] motion-reduce:transition-none 2xl:h-14"
            >
              {t("ctaAll")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
