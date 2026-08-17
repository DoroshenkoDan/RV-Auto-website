import { useTranslations } from "next-intl";

import { Section } from "@/ui/section";

export function AboutIntro() {
  const t = useTranslations("aboutPage.intro");

  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <h1 className="mt-stack max-w-4xl font-logo text-h1 font-bold text-sand">
        {t("titleLead")}{" "}
        <span className="text-brand underline decoration-[0.05em] underline-offset-[0.14em]">
          {t("titleAccent")}
        </span>
      </h1>

      <p className="mt-stack max-w-2xl text-lead text-sand/70">
        {t("description")}
      </p>

      <p className="mt-section-title font-mono text-caption tracking-[0.08em] text-brand/70 uppercase">
        {t("meta")}
      </p>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
