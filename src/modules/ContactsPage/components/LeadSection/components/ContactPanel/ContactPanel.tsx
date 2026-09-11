"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { SocialIcon } from "@/components/SocialIcon";
import type {
  CalculatorEstimate,
  CalculatorInput,
} from "@/lib/calculator/types";
import { PHONE_DISPLAY, PHONE_HREF, SOCIAL_LINKS } from "@/lib/contacts";
import { cn, formatUsd } from "@/lib/utils";

function useCarSummary(car: CalculatorInput) {
  const t = useTranslations("contactsPage.leadSection.car");
  const panel = useTranslations("contactsPage.leadSection.panel");
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
    t(`auction.${car.auction}`),
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
}: {
  car: CalculatorInput;
  result: CalculatorEstimate | null;
  detailed: boolean;
}) {
  const t = useTranslations("contactsPage.leadSection.panel");

  const summary = useCarSummary(car);

  return (
    <div className="relative isolate overflow-hidden bg-ink p-block text-sand">
      <div className="flex flex-col">
        <Image
          src="/images/shared/RVLogoBrand.webp"
          alt=""
          width={2172}
          height={724}
          sizes="288px"
          className="w-72 max-w-full"
        />

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
              <p className="mt-3 max-w-xs text-body text-sand/50">
                {t("empty")}
              </p>
            )}
          </div>

          <Divider />
        </Slot>

        <div className="mt-block flex flex-col gap-y-stack">
          <a
            href={PHONE_HREF}
            className="font-mono text-h3 font-semibold text-sand transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            {PHONE_DISPLAY}
          </a>

          <div className="flex items-center gap-x-3">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="flex size-10 items-center justify-center rounded-sm border border-sand/12 text-sand/70 transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <SocialIcon name={name} className="size-5" />
              </a>
            ))}
          </div>

          <dl className="flex flex-col gap-y-3 text-body text-sand/70">
            <div className="flex items-start gap-x-3">
              <dt className="flex size-5 shrink-0 items-center justify-center">
                <Clock aria-hidden className="size-4 text-sand/40" />
                <span className="sr-only">{t("hoursLabel")}</span>
              </dt>
              <dd>{t("hours")}</dd>
            </div>

            <div className="flex items-start gap-x-3">
              <dt className="flex size-5 shrink-0 items-center justify-center">
                <MapPin aria-hidden className="size-4 text-sand/40" />
                <span className="sr-only">{t("addressLabel")}</span>
              </dt>
              <dd>{t("address")}</dd>
            </div>
          </dl>
        </div>
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
