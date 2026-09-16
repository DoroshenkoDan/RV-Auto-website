import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Review } from "@/payload-types";

import { reviewPhotoUrl } from "../reviewPhoto";

interface Props {
  reviews: Review[];
  activeId: Review["id"];
  onSelect: (id: Review["id"]) => void;
  className?: string;
}

export function ReviewList({ reviews, activeId, onSelect, className }: Props) {
  const t = useTranslations("homePage.reviews");

  return (
    <ul
      aria-label={t("listLabel")}
      className={cn(
        "-mx-6 flex snap-x snap-mandatory scroll-px-6 scrollbar-none gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:scroll-px-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0",
        className,
      )}
    >
      {reviews.map((review) => {
        const photoUrl = reviewPhotoUrl(review.photo);
        const isActive = review.id === activeId;

        return (
          <li key={review.id} className="shrink-0 snap-start lg:shrink">
            <button
              type="button"
              aria-pressed={isActive}
              onClick={(event) => {
                onSelect(review.id);
                event.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "nearest",
                });
              }}
              className={cn(
                "flex w-64 cursor-pointer items-center gap-3 rounded-xl border p-2.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none sm:w-72 lg:w-full",
                isActive
                  ? "border-brand bg-white"
                  : "border-line hover:border-brand/40 hover:bg-white/60",
              )}
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-night-soft">
                {photoUrl && (
                  <Image
                    src={photoUrl}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-label font-bold text-ink">
                  {review.authorName}
                  {review.city && `, ${review.city}`}
                </span>
                <span className="mt-0.5 block truncate font-mono text-caption text-ink-muted">
                  {review.carLabel}
                </span>
              </span>

              {review.deliveryDays && (
                <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 font-mono text-caption text-ink-muted">
                  {t("days", { count: review.deliveryDays })}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
