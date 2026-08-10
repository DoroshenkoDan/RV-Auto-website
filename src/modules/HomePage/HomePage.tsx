import { Calculator } from "./sections/Calculator"
import { CtaHome } from "./sections/CtaHome"
import { Hero } from "./sections/Hero"

export function HomePage() {
  return (
    <>
      <Hero />
      <Calculator />
      <CtaHome />
    </>
  )
}
