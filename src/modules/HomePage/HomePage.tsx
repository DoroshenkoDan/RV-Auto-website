import { Calculator } from "./sections/Calculator";
import { Catalog } from "./sections/Catalog";
import { CtaHome } from "./sections/CtaHome";
import FAQ from "./sections/Faq";
import { Hero } from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";

export function HomePage() {
  return (
    <>
      <Hero />
      <Calculator />
      <Catalog />
      <HowItWorks />
      <FAQ />
      <CtaHome />
    </>
  );
}
