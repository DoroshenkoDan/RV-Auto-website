import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCarsCount, getFeaturedCars } from "@/lib/payload/cars";
import { buttonVariants } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";

import { CatalogTabs } from "./components/CatalogTabs";

export async function Catalog() {
  const t = await getTranslations("homePage.catalog");
  const locale = (await getLocale()) as Locale;
  const [cars, totalCars] = await Promise.all([
    getFeaturedCars(locale),
    getCarsCount(),
  ]);

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      <CatalogTabs cars={cars} />

      <div className="m-6 flex flex-row items-center justify-center gap-2">
        <Link href="/cars" className={buttonVariants({ variant: "outline" })}>
          {t("viewAll")}
        </Link>
        <span className="font-mono text-[13px] text-ink-muted">
          {t("count", { count: totalCars })}
        </span>
      </div>
    </Section>
  );
}
