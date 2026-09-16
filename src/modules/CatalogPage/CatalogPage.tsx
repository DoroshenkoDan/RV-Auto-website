import { getLocale, getTranslations } from "next-intl/server";

import { CatalogCard } from "@/components/CatalogCard";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getPageItems,
  parseCarSort,
  toCatalogQuery,
} from "@/lib/catalog/params";
import {
  getCars,
  getCarStatusCounts,
  type CarStatus,
} from "@/lib/payload/cars";
import { buttonVariants } from "@/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
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
  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

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
        <h1 className="max-w-4xl font-logo text-h1 font-bold text-sand">
          {t("title")}
        </h1>

        {hasCars && (
          <CatalogToolbar
            status={activeStatus}
            sort={activeSort}
            counts={counts}
            className="mt-section-title"
          />
        )}

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

        {result.totalPages > 1 && (
          <Pagination aria-label={t("pagination.label")} className="mt-block">
            <PaginationContent>
              {result.prevPage && (
                <PaginationItem>
                  <PaginationPrevious
                    href={pageHref(result.prevPage)}
                    text={t("pagination.previous")}
                    aria-label={t("pagination.previousLabel")}
                  />
                </PaginationItem>
              )}
              {getPageItems(currentPage, result.totalPages).map((item, i) => (
                <PaginationItem key={`${item}-${i}`}>
                  {item === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={pageHref(item)}
                      isActive={item === currentPage}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              {result.nextPage && (
                <PaginationItem>
                  <PaginationNext
                    href={pageHref(result.nextPage)}
                    text={t("pagination.next")}
                    aria-label={t("pagination.nextLabel")}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </Section>
    </>
  );
}
