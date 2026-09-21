import Image from "next/image";
import { useTranslations } from "next-intl";

import { Section } from "@/ui/section";

export function FaqHero({
  questionCount,
  categoryCount,
}: {
  questionCount: number;
  categoryCount: number;
}) {
  const t = useTranslations("faqPage.hero");

  return (
    <Section
      data-page-hero
      tone="dark"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+var(--spacing-section))]"
    >
      <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <h1 className="mt-stack max-w-4xl font-logo text-h1 font-bold text-sand">
        {t("title")}
      </h1>

      <p className="mt-stack max-w-2xl text-lead text-sand/70">{t("lede")}</p>

      <p className="mt-section-title font-mono text-caption tracking-[0.08em] text-brand/70 uppercase">
        {t("meta", { questions: questionCount, categories: categoryCount })}
      </p>

      <Image
        src="/images/FAQ/question.png"
        alt=""
        width={1254}
        height={1254}
        preload
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[110%] w-auto max-w-none translate-x-[20%] -translate-y-1/2 opacity-15 select-none lg:right-[8%] lg:translate-x-0 lg:opacity-25"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
