"use client";

import { useState, type CSSProperties } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useTranslations } from "next-intl";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/ui/carousel";

import { HeroProgress } from "./components/HeroProgress";
import { HeroSlideCard } from "./components/HeroSlideCard";
import { HERO_SLIDE_DURATION, HERO_SLIDES } from "./slides";
import { useHeroSlideshow } from "./useHeroSlideshow";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function Hero() {
  const t = useTranslations("homePage.hero");
  const [api, setApi] = useState<CarouselApi>();
  const [plugins] = useState(() => [
    Fade(),
    Autoplay({
      delay: HERO_SLIDE_DURATION,
      stopOnInteraction: false,
      breakpoints: { [REDUCED_MOTION]: { active: false } },
    }),
  ]);
  const { active, previous, cycle, playing, goTo } = useHeroSlideshow(api);

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
  }));

  return (
    <section
      style={{ "--hero-duration": `${HERO_SLIDE_DURATION}ms` } as CSSProperties}
      data-page-hero
      className="relative isolate h-svh overflow-hidden bg-night"
    >
      <h1 className="sr-only">{t("title")}</h1>

      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          duration: 30,
          watchDrag: (_, event) => event.type === "touchstart",
        }}
        plugins={plugins}
        aria-label={t("label")}
        className="h-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.key}
              aria-hidden={index !== active}
              inert={index !== active}
              className="relative pl-0"
            >
              <HeroSlideCard
                slide={slide}
                isActive={index === active}
                isZooming={index === active || index === previous}
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <HeroProgress
        slides={slides}
        active={active}
        cycle={cycle}
        playing={playing}
        label={t("navLabel")}
        onSelect={goTo}
        className="absolute inset-x-0 bottom-0 page-shell justify-start pb-block sm:justify-center"
      />
    </section>
  );
}
