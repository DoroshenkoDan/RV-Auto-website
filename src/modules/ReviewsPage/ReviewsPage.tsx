import { getLocale, getTranslations } from "next-intl/server";

import { EmptyState } from "@/components/EmptyState";
import { ReviewCard } from "@/components/ReviewCard";
import type { Locale } from "@/i18n/routing";
import { getReviews } from "@/lib/payload/reviews";
import { Section} from "@/ui/section";

export async function ReviewsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("reviewsPage");
  const reviews = await getReviews(locale);

  return (
    <Section>
      {reviews.length > 0 ? (
        <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
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
    </Section>
  );
}
