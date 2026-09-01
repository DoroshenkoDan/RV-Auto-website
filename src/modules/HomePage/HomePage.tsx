import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";

import { Calculator } from "./sections/Calculator";
import { Catalog } from "./sections/Catalog";
import FAQ from "./sections/Faq";
import { Hero } from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import { Reviews } from "./sections/Reviews";

export function HomePage() {
  const t = useTranslations("homePage.ctaHome");
  return (
    <>
      <Hero />
      <Calculator />
      <Catalog />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
