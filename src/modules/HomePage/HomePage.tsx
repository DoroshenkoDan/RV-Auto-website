import { Calculator } from "./sections/Calculator";
import { Catalog } from "./sections/Catalog";
import { CtaHome } from "./sections/CtaHome";
import { Hero } from "./sections/Hero";

export function HomePage() {
  return (
    <>
      <Hero />
      <Calculator />
      <Catalog />
      <CtaHome />
    </>
  );
}
