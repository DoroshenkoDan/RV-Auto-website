import { getLocale, getTranslations } from "next-intl/server";

import { CatalogCard } from "@/components/CatalogCard";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCars, getCarsCount, type CarStatus } from "@/lib/payload/cars";
import { buttonVariants } from "@/ui/button";
import { Section } from "@/ui/section";

const STATUSES: CarStatus[] = ["available", "inTransit", "auction"];
const PAGE_SIZE = 12;

function isCarStatus(value: string | undefined): value is CarStatus {
  return STATUSES.includes(value as CarStatus);
}

interface Props {
  status?: string;
  page?: string;
}

export async function CatalogPage({ status, page }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("homePage.catalog.tabs");
  const tEmpty = await getTranslations("catalogPage");
  const activeStatus = isCarStatus(status) ? status : undefined;
  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const result = await getCars({
    locale,
    status: activeStatus,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const isEmpty = result.docs.length === 0;
  const hasNoCars = isEmpty && (await getCarsCount()) === 0;

  if (hasNoCars) {
    return (
      <Section>
        <EmptyState
          eyebrow={tEmpty("empty.eyebrow")}
          title={tEmpty("empty.title")}
          description={tEmpty("empty.description")}
        />
      </Section>
    );
  }

  return (
    <Section>
      <nav>
        <Link href="/cars">{t("all")}</Link>
        {STATUSES.map((s) => (
          <Link key={s} href={{ pathname: "/cars", query: { status: s } }}>
            {t(s)}
          </Link>
        ))}
      </nav>
      {isEmpty ? (
        <EmptyState
          className="mt-section-title"
          eyebrow={tEmpty("emptyFilter.eyebrow")}
          title={tEmpty("emptyFilter.title")}
          description={tEmpty("emptyFilter.description")}
          action={
            <Link
              href="/cars"
              className={buttonVariants({ variant: "outline" })}
            >
              {tEmpty("emptyFilter.action")}
            </Link>
          }
        />
      ) : (
        <div>
          {result.docs.map((car) => (
            <CatalogCard key={car.id} car={car} />
          ))}
        </div>
      )}
      {result.totalPages > 1 && (
        <nav>
          {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <Link
                key={p}
                href={{
                  pathname: "/cars",
                  query: activeStatus
                    ? { status: activeStatus, page: p }
                    : { page: p },
                }}
              >
                {p}
              </Link>
            ),
          )}
        </nav>
      )}
    </Section>
  );
}
