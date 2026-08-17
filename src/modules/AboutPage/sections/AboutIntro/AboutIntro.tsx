import { useTranslations } from "next-intl";

import { Section } from "@/ui/section";

// Header is fixed, so the first section carries extra top padding to clear it.
export function AboutIntro() {
  const t = useTranslations("aboutPage.intro");

  return (
    <Section
      tone="dark"
      className="relative isolate overflow-hidden pt-32 lg:pt-36 2xl:pt-40"
    >
      <p className="font-mono text-xs font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <h1 className="mt-5 max-w-4xl font-logo text-[clamp(1.75rem,2vw+1.6vh,3.25rem)] leading-[1.08] font-bold tracking-[-0.02em] text-sand">
        {t("titleLead")}{" "}
        <span className="text-brand underline decoration-[0.05em] underline-offset-[0.14em]">
          {t("titleAccent")}
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-[15px] leading-[1.58] text-sand/70 xl:text-[17px]">
        {t("description")}
      </p>

      <p className="mt-8 font-mono text-xs leading-[1.5] tracking-[0.08em] text-brand/70 uppercase">
        {t("meta")}
      </p>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
