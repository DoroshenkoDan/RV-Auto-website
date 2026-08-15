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
        <h2 className="mb-8 text-center font-logo text-2xl leading-tight font-bold lg:mb-10 lg:text-3xl 2xl:mb-12 2xl:text-4xl">
          {t("title")}
        </h2>
        <CatalogTabs cars={cars} />
        <div className="m-6 flex flex-row items-center justify-center gap-2">
          <Link
            href="/cars"
            className="rounded-sm border-2 border-night-soft px-8 py-3 font-sans text-[15px] font-semibold text-night-soft duration-200 ease-in-out hover:border-night-soft/30 hover:bg-night-soft/10"
          >
            {t("viewAll")}
          </Link>
          <span className="font-mono text-[13px] text-ink-muted">
            {t("count", { count: totalCars })}
          </span>
        </div>
      </div>
    </section>
  );
}
