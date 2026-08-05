"use client"

import type { CSSProperties } from "react"
import { useTranslations } from "next-intl"

import { HeroProgress } from "./sections/HeroProgress"
import { HeroSlideCard } from "./sections/HeroSlideCard"
import { HERO_SLIDE_DURATION, HERO_SLIDES } from "./slides"
import { useHeroSlideshow } from "./useHeroSlideshow"

export function Hero() {
  const t = useTranslations("hero")
  const { active, cycle, goTo } = useHeroSlideshow(HERO_SLIDES.length)

  const slides = HERO_SLIDES.map(({ key, href, image }) => ({
    key,
    href,
    image,
    label: t(`slides.${key}.label`),
    titleLead: t(`slides.${key}.titleLead`),
    titleAccent: t(`slides.${key}.titleAccent`),
    description: t(`slides.${key}.description`),
    cta: t(`slides.${key}.cta`),
    meta: t(`slides.${key}.meta`),
  }))

  return (
    <section
      style={{ "--hero-duration": `${HERO_SLIDE_DURATION}ms` } as CSSProperties}
      className="relative isolate h-svh min-h-[36rem] overflow-hidden bg-night"
    >
      {slides.map((slide, index) => (
        <HeroSlideCard
          key={slide.key}
          slide={slide}
          isActive={index === active}
          priority={index === 0}
        />
      ))}

      <HeroProgress
        slides={slides}
        active={active}
        cycle={cycle}
        label={t("navLabel")}
        onSelect={goTo}
        className="page-shell absolute inset-x-0 bottom-0 justify-start pb-8 sm:justify-center lg:pb-12"
      />
    </section>
  )
}
