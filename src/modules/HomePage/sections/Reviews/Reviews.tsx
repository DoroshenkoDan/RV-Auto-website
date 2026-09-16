import { getLocale, getTranslations } from "next-intl/server";

import { SectionFallback } from "@/components/SectionFallback";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedReviews, getReviewsCount } from "@/lib/payload/reviews";
import { buttonVariants } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";

import { ReviewsShowcase } from "./components/ReviewsShowcase";

async function loadReviews(locale: Locale) {
  try {
    const [reviews, totalReviews] = await Promise.all([
      getFeaturedReviews(locale),
      getReviewsCount(),
    ]);
    return reviews.length > 0 ? { reviews, totalReviews } : null;
  } catch {
    return null;
  }
}

export async function Reviews() {
  const t = await getTranslations("homePage.reviews");
  const locale = (await getLocale()) as Locale;
  const data = await loadReviews(locale);

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      {data ? (
        <ReviewsShowcase
          reviews={data.reviews}
          footer={
            <div className="flex flex-row items-center justify-center gap-2 lg:justify-start">
              <Link
                href="/reviews"
                className={buttonVariants({ variant: "outline" })}
              >
                {t("viewAll")}
              </Link>
              <span className="font-mono text-label text-ink-muted">
                {t("count", { count: data.totalReviews })}
              </span>
            </div>
          }
        />
      ) : (
        <SectionFallback />
      )}
    </Section>
  );
}
