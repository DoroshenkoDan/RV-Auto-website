import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";
import { getCarBySlug } from "@/lib/payload/cars";
import { buildBreadcrumbJsonLd, buildCarJsonLd } from "@/lib/seo/jsonLd";
import { absoluteUrl, pageUrl } from "@/lib/seo/metadata";

import { CarHero } from "./sections/CarHero";
import { SimilarCars } from "./sections/SimilarCars";

export async function CarPage({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale;
  const [car, t, nav] = await Promise.all([
    getCarBySlug(slug, locale),
    getTranslations("carPage.cta"),
    getTranslations("nav"),
  ]);

  if (!car) {
    notFound();
  }

  const url = pageUrl(locale, `/cars/${car.slug}`);
  const images = car.gallery.flatMap((image) =>
    typeof image === "object" && image.url ? [absoluteUrl(image.url)] : [],
  );

  return (
    <>
      <JsonLd data={buildCarJsonLd({ ...car, url, images })} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: pageUrl(locale, "/") },
          { name: nav("cars"), url: pageUrl(locale, "/cars") },
          { name: car.title, url },
        ])}
      />
      <CarHero car={car} />
      <SimilarCars car={car} />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
