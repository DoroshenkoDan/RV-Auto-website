import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/ContactForm";
import { Section, SectionTitle } from "@/ui/section";

export function CtaHome() {
  const t = useTranslations("homePage.ctaHome");

  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <SectionTitle
        align="center"
        spacing="tight"
        className="mx-auto max-w-2xl"
      >
        {t("title")}
      </SectionTitle>

      <p className="mx-auto max-w-md text-center text-[15px] leading-normal text-sand/60">
        {t("description")}
      </p>

      <ContactForm layout="row" className="mx-auto mt-8 max-w-3xl lg:mt-10" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-20 -z-10 size-120 -translate-x-1/2 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
