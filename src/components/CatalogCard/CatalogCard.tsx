import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Car } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { formatUsd } from "@/lib/utils";
import { CarPhotoCarousel } from "@/components/CarPhotoCarousel";
import { CarStatusBadge } from "@/components/CarStatusBadge";
import { buttonVariants } from "@/ui/button";

interface Props {
  car: Car;
  className?: string;
}

export function CatalogCard({ className = "", car }: Props) {
  const t = useTranslations("carCard");

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-line bg-white",
        className,
      )}
    >
      <div className="relative aspect-16/10 shrink-0">
        <CarPhotoCarousel
          gallery={car.gallery}
          alt={car.title}
          fill
          revealControlsOnHover
        />
        <CarStatusBadge
          status={car.status}
          className="absolute top-2 left-2 backdrop-blur-sm"
        />
      </div>
      <div className="flex flex-1 flex-col p-stack">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-h3 font-bold text-ink">{car.title}</h3>
          <span className="text-label text-ink-muted">{car.year}</span>
        </div>
        <p className="mt-1 text-label text-ink-muted">
          {car.mileageKm.toLocaleString("en-US")} km · {car.engine} ·{" "}
          {car.drivetrain}
        </p>

        <div className="mt-auto pt-title-tight">
          <hr className="mb-title-tight border-line" />

          <p className="text-caption tracking-wide text-ink-muted uppercase">
            {t("price")}
          </p>
          <p className="text-stat font-bold text-ink">{formatUsd(car.price)}</p>

          <div className="mt-title-tight flex gap-2">
            <Link
              href={{ pathname: "/contacts", query: { car: car.slug } }}
              className={buttonVariants({ size: "sm", className: "flex-1" })}
            >
              {t("order")}
            </Link>
            <Link
              href={`/cars/${car.slug}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "flex-1",
              })}
            >
              {t("details")}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
