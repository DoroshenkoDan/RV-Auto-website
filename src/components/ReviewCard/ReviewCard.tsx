import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Review } from "@/payload-types";

function photoUrlOf(photo: Review["photo"]) {
  return typeof photo === "object" && photo?.url ? photo.url : null;
}

interface Props {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className = "" }: Props) {
  const t = useTranslations("reviewCard");
  const format = useFormatter();
  const photoUrl = photoUrlOf(review.photo);

  const chips = [
    review.deliveryDays
      ? t("deliveryDays", { count: review.deliveryDays })
      : null,
    review.date
      ? format.dateTime(new Date(review.date), {
          month: "long",
          year: "numeric",
        })
      : null,
  ].filter((chip): chip is string => chip !== null);

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-line bg-white",
        className,
      )}
    >
      <div className="relative aspect-4/3 shrink-0 bg-night-soft">
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={t("photoAlt", {
              name: review.authorName,
              car: review.carLabel,
            })}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-block">
        <p className="line-clamp-6 text-body text-pretty text-ink">
          {t("quote", { quote: review.quote })}
        </p>

        <div className="mt-auto pt-title-tight">
          <hr className="mb-title-tight border-line" />

          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-h3 font-bold text-ink">{review.authorName}</h3>
            {review.city && (
              <span className="text-label text-ink-muted">{review.city}</span>
            )}
          </div>

          <p className="mt-1 font-mono text-label text-ink-muted">
            {review.carLabel}
          </p>

          {chips.length > 0 && (
            <div className="mt-title-tight flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-surface px-2.5 py-1 font-mono text-caption text-ink-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
