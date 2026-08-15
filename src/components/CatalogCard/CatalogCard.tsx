import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Car } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { formatUsd } from "@/lib/utils";
import { CarPhotoCarousel } from "@/components/CarPhotoCarousel";
import { Button, buttonVariants } from "@/ui/button";

interface Props {
  car: Car;
  className?: string;
}
// Todo: add func to btn to open the form

const STATUS_BADGE_CLASS: Record<Car["status"], string> = {
  available: "bg-brand",
  inTransit: "bg-night-soft",
  auction: "bg-ink",
};

export function CatalogCard({ className = "", car }: Props) {
  const t = useTranslations("homePage.catalog.status");
  const note = car.locationNote ?? car.etaNote ?? car.auctionNote;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border border-line bg-white",
        className,
      )}
    >
      <div className="relative aspect-4/3">
        <CarPhotoCarousel
          gallery={car.gallery}
          alt={car.title}
          fill
          revealControlsOnHover
        />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase",
            STATUS_BADGE_CLASS[car.status],
          )}
        >
          {t(car.status)}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-ink">{car.title}</h3>
          <span className="text-sm text-ink-muted">{car.year}</span>
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          {car.mileageKm.toLocaleString("en-US")} km · {car.engine} ·{" "}
          {car.drivetrain}
        </p>
        {note && <p className="mt-1 text-sm text-ink-muted">{note}</p>}
        <hr className="my-4 border-line" />
        <p className="text-xs tracking-wide text-ink-muted uppercase">
          Ціна під ключ
        </p>
        <p className="text-2xl font-bold text-ink">{formatUsd(car.price)}</p>
        <div className="mt-4 flex gap-2">
          <Button type="button" size="sm" className="flex-1">
            Замовити
          </Button>
          <Link
            href={`/cars/${car.slug}`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "flex-1",
            })}
          >
            Детальніше
          </Link>
        </div>
      </div>
    </article>
  );
}
