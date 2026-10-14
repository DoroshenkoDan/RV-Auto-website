import { useTranslations } from "next-intl";

import { CarStatusBadge } from "@/components/CarStatusBadge";
import { Link } from "@/i18n/navigation";
import { cn, formatUsd } from "@/lib/utils";
import type { Car } from "@/payload-types";
import { buttonVariants } from "@/ui/button";

import { CopyVinButton } from "../CopyVinButton";

export function CarSummary({
  car,
  className = "",
}: {
  car: Car;
  className?: string;
}) {
  const t = useTranslations("carPage");
  const tCard = useTranslations("carCard");

  const specs = [
    {
      key: "mileage",
      value: t("specs.mileageValue", {
        value: car.mileageKm.toLocaleString("en-US"),
      }),
    },
    { key: "engine", value: car.engine },
    { key: "drivetrain", value: car.drivetrain },
    { key: "transmission", value: t(`transmission.${car.transmission}`) },
  ];

  return (
    <aside
      className={cn(
        "rounded-lg border border-line bg-white p-block md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-block",
        className,
      )}
    >
      <div>
        <CarStatusBadge status={car.status} />

        <h1 className="mt-title-tight font-logo text-h2 font-bold">
          {car.title}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-label text-ink-muted">
          <span>{car.year}</span>
          <span className="rounded-sm border border-line px-2 py-0.5 text-caption">
            {t(`condition.${car.condition}`)}
          </span>
        </div>

        <p className="mt-block text-caption tracking-wide text-ink-muted uppercase">
          {tCard("price")}
        </p>
        <p className="text-stat font-bold">{formatUsd(car.price)}</p>
      </div>

      <div className="md:max-lg:self-center">
        <hr className="my-stack border-line md:max-lg:hidden" />

        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-body">
          {specs.map(({ key, value }) => (
            <div key={key} className="contents">
              <dt className="text-ink-muted">{t(`specs.${key}`)}</dt>
              <dd className="text-right font-semibold">{value}</dd>
            </div>
          ))}
          {car.vin && (
            <div className="contents">
              <dt className="self-center text-ink-muted">{t("specs.vin")}</dt>
              <dd className="flex items-center justify-end gap-1 font-mono font-semibold">
                <span className="text-label break-all">{car.vin}</span>
                <CopyVinButton vin={car.vin} />
              </dd>
            </div>
          )}
        </dl>
      </div>

      <Link
        href={{ pathname: "/contacts", query: { car: car.slug } }}
        className={buttonVariants({
          size: "lg",
          className: "mt-block w-full md:max-lg:col-span-2",
        })}
      >
        {tCard("order")}
      </Link>
    </aside>
  );
}
