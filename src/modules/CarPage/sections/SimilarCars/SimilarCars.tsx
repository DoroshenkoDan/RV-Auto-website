import { getLocale, getTranslations } from "next-intl/server";

import { CardCarousel } from "@/components/CardCarousel";
import { CatalogCard } from "@/components/CatalogCard";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSimilarCars } from "@/lib/payload/cars";
import type { Car } from "@/payload-types";
import { buttonVariants } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";

async function loadSimilarCars(car: Car, locale: Locale) {
  try {
    return await getSimilarCars(car, locale);
  } catch {
    return [];
  }
}

export async function SimilarCars({ car }: { car: Car }) {
  const t = await getTranslations("carPage.similar");
  const locale = (await getLocale()) as Locale;
  const cars = await loadSimilarCars(car, locale);

  if (cars.length === 0) return null;

  return (
    <Section className="pt-0">
      <SectionTitle>{t("title")}</SectionTitle>

      <CardCarousel
        stopAt="xl"
        itemClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-auto"
      >
        {cars.map((similar) => (
          <CatalogCard key={similar.id} car={similar} className="h-full" />
        ))}
      </CardCarousel>

      <div className="mt-section-title flex justify-center">
        <Link href="/cars" className={buttonVariants({ variant: "outline" })}>
          {t("viewAll")}
        </Link>
      </div>
    </Section>
  );
}
