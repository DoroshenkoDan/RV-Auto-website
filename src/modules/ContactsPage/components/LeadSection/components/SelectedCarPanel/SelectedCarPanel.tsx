"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contacts";

import type { LeadCar } from "../../types";

export function SelectedCarPanel({
  car,
  onRemove,
}: {
  car: LeadCar;
  onRemove: () => void;
}) {
  const t = useTranslations("contactsPage.leadSection.panel");

  const specs = [
    String(car.year),
    `${car.mileageKm.toLocaleString("en-US")} km`,
    car.engine,
    car.drivetrain,
    t(`transmission.${car.transmission}`),
  ];

  return (
    <div className="relative isolate flex min-h-120 flex-col justify-end overflow-hidden bg-ink p-block text-sand">
      {car.photo && (
        <Image
          src={car.photo.url}
          alt={car.photo.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="-z-20 object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink from-35% via-ink/60 via-65% to-ink/15"
      />

      <button
        type="button"
        onClick={onRemove}
        aria-label={t("removeCar")}
        className="absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-sand/25 bg-ink/60 text-sand backdrop-blur-sm transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <X aria-hidden className="size-4" />
      </button>

      <p className="font-mono text-micro tracking-[0.25em] text-brand uppercase">
        {t("selectedCar")}
      </p>
      <h3 className="mt-3 font-logo text-h3 font-bold">{car.title}</h3>

      <ul className="mt-stack flex flex-wrap gap-2">
        {specs.map((spec) => (
          <li
            key={spec}
            className="rounded-sm border border-sand/14 px-2.5 py-1 text-label text-sand/80"
          >
            {spec}
          </li>
        ))}
      </ul>

      <div className="mt-block h-px w-full bg-sand/12" />

      <div className="mt-stack flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-micro tracking-[0.25em] text-sand/50 uppercase">
          {t("phoneLabel")}
        </p>
        <a
          href={PHONE_HREF}
          className="font-mono text-body font-semibold text-sand transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
