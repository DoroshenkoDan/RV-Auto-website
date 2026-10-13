import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/CtaSection";
import type { Locale } from "@/i18n/routing";
import { getCarBySlug } from "@/lib/payload/cars";

import { CarHero } from "./sections/CarHero";
import { SimilarCars } from "./sections/SimilarCars";

export async function CarPage({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale;
  const [car, t] = await Promise.all([
    getCarBySlug(slug, locale),
    getTranslations("carPage.cta"),
  ]);

  if (!car) {
    notFound();
  }

  return (
    <>
      <CarHero car={car} />
      <SimilarCars car={car} />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
