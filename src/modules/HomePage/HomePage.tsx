import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";
import type { ExchangeRates } from "@/lib/calculator/types";

import { Calculator } from "./sections/Calculator";
import { Catalog } from "./sections/Catalog";
import FAQ from "./sections/Faq";
import { Hero } from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import { Reviews } from "./sections/Reviews";

export function HomePage({ rates }: { rates: ExchangeRates }) {
  const t = useTranslations("homePage.ctaHome");
  return (
    <>
      <Hero />
      <Calculator rates={rates} />
      <Catalog />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
