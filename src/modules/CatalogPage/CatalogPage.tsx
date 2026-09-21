import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { CatalogCard } from "@/components/CatalogCard";
import { EmptyState } from "@/components/EmptyState";
import { PagePagination } from "@/components/PagePagination";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { parseCarSort, parsePage, toCatalogQuery } from "@/lib/catalog/params";
import {
  getCars,
  getCarStatusCounts,
  type CarStatus,
} from "@/lib/payload/cars";
import { buttonVariants } from "@/ui/button";
import { Section } from "@/ui/section";

import { CatalogToolbar } from "./components/CatalogToolbar";

const STATUSES: CarStatus[] = ["available", "inTransit", "auction"];
const PAGE_SIZE = 12;

function isCarStatus(value: string | undefined): value is CarStatus {
  return STATUSES.includes(value as CarStatus);
}

interface Props {
  status?: string;
  sort?: string;
  page?: string;
}

export async function CatalogPage({ status, sort, page }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("catalogPage");
  const activeStatus = isCarStatus(status) ? status : undefined;
  const activeSort = parseCarSort(sort);
  const currentPage = parsePage(page);

  const [result, counts] = await Promise.all([
    getCars({
      locale,
      status: activeStatus,
      sort: activeSort,
      page: currentPage,
      limit: PAGE_SIZE,
    }),
    getCarStatusCounts(),
  ]);

  const hasCars = counts.all > 0;
  const pageHref = (p: number) => ({
    pathname: "/cars",
    query: toCatalogQuery({ status: activeStatus, sort: activeSort, page: p }),
  });

  return (
    <>
      <Section
        data-page-hero
        tone="dark"
        className="relative isolate overflow-hidden pt-[calc(var(--header-h)+var(--spacing-section))]"
      >
        <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
          [{t("eyebrow")}]
        </p>

        <h1 className="mt-stack max-w-4xl font-logo text-h1 font-bold text-sand">
          {t("title")}
        </h1>

        <p className="mt-stack max-w-2xl text-lead text-sand/70">{t("lede")}</p>

        {hasCars && (
          <CatalogToolbar
            status={activeStatus}
            sort={activeSort}
            counts={counts}
            className="mt-section-title"
          />
        )}

        <Image
          src="/images/Catalog/CatalogHeroBg.webp"
          alt=""
          width={1500}
          height={654}
          preload
          sizes="(min-width: 1024px) 55vw, 90vw"
          className="pointer-events-none absolute top-1/2 right-0 -z-10 w-[90%] max-w-4xl translate-x-[10%] translate-y-[-30%] opacity-10 select-none lg:w-[55%] lg:translate-x-[-10%] lg:opacity-20"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
        />
      </Section>

      <Section>
        {!hasCars ? (
          <EmptyState
            eyebrow={t("empty.eyebrow")}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        ) : result.docs.length === 0 ? (
          <EmptyState
            eyebrow={t("emptyFilter.eyebrow")}
            title={t("emptyFilter.title")}
            description={t("emptyFilter.description")}
            action={
              <Link
                href="/cars"
                className={buttonVariants({ variant: "outline" })}
              >
                {t("emptyFilter.action")}
              </Link>
            }
          />
        ) : (
          <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {result.docs.map((car) => (
              <CatalogCard key={car.id} car={car} className="h-full" />
            ))}
          </div>
        )}

        <PagePagination
          currentPage={currentPage}
          totalPages={result.totalPages}
          label={t("paginationLabel")}
          getHref={pageHref}
          className="mt-block"
        />
      </Section>
    </>
  );
}
