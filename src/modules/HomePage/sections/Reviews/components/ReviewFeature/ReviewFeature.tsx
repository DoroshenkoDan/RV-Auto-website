import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Review } from "@/payload-types";

import { reviewPhotoUrl } from "../reviewPhoto";

interface Props {
  review: Review;
  className?: string;
}

export function ReviewFeature({ review, className }: Props) {
  const t = useTranslations("homePage.reviews");
  const tCard = useTranslations("reviewCard");
  const format = useFormatter();
  const photoUrl = reviewPhotoUrl(review.photo);

  const chips = [
    review.deliveryDays ? t("days", { count: review.deliveryDays }) : null,
    review.date
      ? format.dateTime(new Date(review.date), {
          month: "long",
          year: "numeric",
        })
      : null,
  ].filter((chip): chip is string => chip !== null);

  return (
    <article
      aria-live="polite"
      className={cn(
        "relative isolate flex min-h-104 flex-col justify-end overflow-hidden rounded-3xl bg-night-soft text-sand lg:min-h-120",
        className,
      )}
    >
      <div
        key={review.id}
        className="absolute inset-0 -z-10 duration-500 motion-safe:animate-in motion-safe:fade-in-0"
      >
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={tCard("photoAlt", {
              name: review.authorName,
              car: review.carLabel,
            })}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-night from-25% via-night/70 via-55% to-night/10"
        />
      </div>

      <div
        key={`content-${review.id}`}
        className="p-block duration-500 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
      >
        <p className="line-clamp-6 max-w-2xl text-lead text-pretty">
          {t.rich("quote", {
            quote: review.quote,
            mark: (chunks) => (
              <span className="font-bold text-brand">{chunks}</span>
            ),
          })}
        </p>

        <div className="mt-stack flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h3 className="text-h3 font-bold">
              {review.authorName}
              {review.city && (
                <span className="font-normal text-sand/60">
                  , {review.city}
                </span>
              )}
            </h3>
            <p className="mt-1 font-mono text-label text-sand/60">
              {review.carLabel}
            </p>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-sand/12 px-2.5 py-1 font-mono text-caption text-sand/80"
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
