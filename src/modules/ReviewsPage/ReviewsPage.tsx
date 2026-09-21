import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { EmptyState } from "@/components/EmptyState";
import { PagePagination } from "@/components/PagePagination";
import { ReviewCard } from "@/components/ReviewCard";
import type { Locale } from "@/i18n/routing";
import { parsePage } from "@/lib/catalog/params";
import { getReviews } from "@/lib/payload/reviews";
import { Section } from "@/ui/section";

const PAGE_SIZE = 12;

export async function ReviewsPage({ page }: { page?: string }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("reviewsPage");
  const currentPage = parsePage(page);
  const result = await getReviews({
    locale,
    page: currentPage,
    limit: PAGE_SIZE,
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

        <Image
          src="/images/Reviews/ReviewsHeroBg.webp"
          alt=""
          width={1345}
          height={937}
          preload
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[110%] w-auto max-w-none translate-x-[25%] translate-y-[-40%] opacity-10 select-none lg:translate-x-[-10%] lg:opacity-20"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
        />
      </Section>

      <Section>
        {result.docs.length > 0 ? (
          <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
            {result.docs.map((review) => (
              <ReviewCard key={review.id} review={review} className="h-full" />
            ))}
          </div>
        ) : (
          <EmptyState
            eyebrow={t("empty.eyebrow")}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        )}

        <PagePagination
          currentPage={currentPage}
          totalPages={result.totalPages}
          label={t("paginationLabel")}
          getHref={(p) => ({
            pathname: "/reviews",
            query: p > 1 ? { page: p } : {},
          })}
          className="mt-block"
        />
      </Section>
    </>
  );
}
