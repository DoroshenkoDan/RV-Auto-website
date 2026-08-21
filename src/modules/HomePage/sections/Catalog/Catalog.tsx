import { getLocale, getTranslations } from "next-intl/server";

import { SectionFallback } from "@/components/SectionFallback";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCarsCount, getFeaturedCars } from "@/lib/payload/cars";
import { buttonVariants } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";

import { CatalogTabs } from "./components/CatalogTabs";

async function loadCatalog(locale: Locale) {
  try {
    const [cars, totalCars] = await Promise.all([
      getFeaturedCars(locale),
      getCarsCount(),
    ]);
    return cars.length > 0 ? { cars, totalCars } : null;
  } catch {
    return null;
  }
}

export async function Catalog() {
  const t = await getTranslations("homePage.catalog");
  const locale = (await getLocale()) as Locale;
  const catalog = await loadCatalog(locale);

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      {catalog ? (
        <>
          <CatalogTabs cars={catalog.cars} />

          <div className="mt-section-title flex flex-row items-center justify-center gap-2">
            <Link
              href="/cars"
              className={buttonVariants({ variant: "outline" })}
            >
              {t("viewAll")}
            </Link>
            <span className="font-mono text-label text-ink-muted">
              {t("count", { count: catalog.totalCars })}
            </span>
          </div>
        </>
      ) : (
        <SectionFallback />
      )}
    </Section>
  );
}
