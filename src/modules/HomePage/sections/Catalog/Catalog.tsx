import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { CatalogTabs } from "./components/CatalogTabs";
import { getCarsCount, getFeaturedCars } from "@/lib/payload/cars";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

interface Props {
  className?: string;
}

export async function Catalog({ className = "" }: Props) {
  const t = await getTranslations("homePage.catalog");
  const locale = (await getLocale()) as Locale;
  const cars = await getFeaturedCars(locale);
  const totalCars = await getCarsCount();

  return (
    <section className={cn("bg-canvas py-16 lg:py-20 2xl:py-24", className)}>
      <div className="page-shell">
        <h2 className="text-center text-2xl leading-tight font-bold lg:text-3xl 2xl:text-4xl font-logo mb-8 lg:mb-10 2xl:mb-12">
          {t("title")}
        </h2>
        <CatalogTabs cars={cars} />
        <div className="m-6 flex flex-row gap-2 justify-center items-center">
          <Link href="/cars" className="text-[15px] text-night-soft font-semibold font-sans px-8 py-3 rounded-sm border-night-soft border-2 hover:bg-night-soft/10 hover:border-night-soft/30 ease-in-out duration-200">
            {t("viewAll")}
          </Link>
          <span className="text-[13px] font-mono text-ink-muted">
            {t("count", { count: totalCars })}
          </span>
        </div>
      </div>
    </section>
  );
}
