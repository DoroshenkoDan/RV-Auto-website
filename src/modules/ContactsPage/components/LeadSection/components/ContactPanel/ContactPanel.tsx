"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import type {
  CalculatorEstimate,
  CalculatorInput,
} from "@/lib/calculator/types";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contacts";
import { cn, formatUsd } from "@/lib/utils";

import type { LeadCar } from "../../types";
import { SelectedCarPanel } from "../SelectedCarPanel";

function useCarSummary(car: CalculatorInput) {
  const t = useTranslations("contactsPage.leadSection.car");
  const panel = useTranslations("contactsPage.leadSection.panel");
  const platforms = useTranslations("services.platforms");
  const locale = useLocale();

  const engine =
    car.fuel === "electric"
      ? car.batteryCapacity !== null &&
        panel("kwh", { value: car.batteryCapacity })
      : car.engineVolume !== null &&
        panel("litres", { value: (car.engineVolume / 1000).toFixed(1) });

  return [
    t(`vehicle.${car.vehicle}`),
    [t(`fuel.${car.fuel}`).toLocaleLowerCase(locale), engine]
      .filter(Boolean)
      .join(" "),
    car.year,
    platforms(`${car.auction}.name`),
  ]
    .filter(Boolean)
    .join(", ");
}

function Slot({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="mt-block h-px w-full bg-sand/12" />;
}

export function ContactPanel({
  car,
  result,
  detailed,
  selectedCar,
  onRemoveCar,
}: {
  car: CalculatorInput;
  result: CalculatorEstimate | null;
  detailed: boolean;
  selectedCar: LeadCar | null;
  onRemoveCar: () => void;
}) {
  const t = useTranslations("contactsPage.leadSection.panel");

  const summary = useCarSummary(car);

  if (selectedCar) {
    return <SelectedCarPanel car={selectedCar} onRemove={onRemoveCar} />;
  }

  return (
    <div className="relative isolate overflow-hidden bg-ink p-block text-sand">
      <div className="flex h-full flex-col justify-center text-center">
        <span className="relative block aspect-square w-52 self-center sm:w-64">
          <Image
            src="/images/shared/logo.webp"
            alt=""
            fill
            sizes="(min-width: 640px) 256px, 208px"
            loading="eager"
            className="object-cover"
          />
        </span>

        <Slot open={!detailed}>
          <Divider />
        </Slot>

        <Slot open={detailed}>
          <div className="mt-block">
            <p className="font-mono text-micro tracking-[0.25em] text-sand/50 uppercase">
              {t("total")}
            </p>

            {result ? (
              <>
                <p className="mt-3 font-mono text-display font-bold text-brand">
                  {formatUsd(result.total)}
                </p>
                <p className="mt-3 text-label text-sand/60">{summary}</p>
              </>
            ) : (
              <p className="mx-auto mt-3 max-w-xs text-body text-sand/50">
                {t("empty")}
              </p>
            )}
          </div>

          <Divider />
        </Slot>

        <p className="mt-block font-mono text-micro tracking-[0.25em] text-sand/50 uppercase">
          {t("phoneLabel")}
        </p>
        <a
          href={PHONE_HREF}
          className="mt-3 self-center font-mono text-body font-semibold text-sand transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {PHONE_DISPLAY}
        </a>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-32 -z-10 size-56 rounded-full bg-neon/20 blur-3xl"
      />
    </div>
  );
}
