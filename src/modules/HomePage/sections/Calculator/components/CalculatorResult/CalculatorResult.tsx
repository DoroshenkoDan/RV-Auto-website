import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contacts";
import { cn, formatUsd } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

import type { CalculatorEstimate } from "../../types";

const LINE_TONES = [
  "bg-brand",
  "bg-brand/85",
  "bg-brand/70",
  "bg-brand/55",
  "bg-brand/45",
  "bg-brand/35",
  "bg-brand/25",
];

export function CalculatorResult({
  estimate,
}: {
  estimate: CalculatorEstimate;
}) {
  const t = useTranslations("homePage.calculator.result");

  return (
    <div className="flex h-full flex-col gap-y-stack">
      <div>
        <p className="font-mono text-micro tracking-[0.25em] text-sand/50 uppercase">
          {t("label")}
        </p>
        <p className="mt-2 font-mono text-display font-bold text-brand">
          {formatUsd(estimate.total)}
        </p>
      </div>

      <div
        aria-hidden
        className="flex h-1.5 w-full overflow-hidden rounded-full bg-sand/10"
      >
        {estimate.lines.map((line, index) => (
          <span
            key={line.key}
            style={{ width: `${(line.amount / estimate.total) * 100}%` }}
            className={LINE_TONES[index]}
          />
        ))}
      </div>

      <ul className="flex flex-col">
        {estimate.lines.map((line, index) => (
          <li
            key={line.key}
            className="flex items-center justify-between gap-x-4 border-b border-sand/10 py-2.5"
          >
            <span className="flex items-center gap-x-3">
              <span
                aria-hidden
                className={cn("size-2 shrink-0", LINE_TONES[index])}
              />
              <span className="text-sand/90">{t(`lines.${line.key}`)}</span>
            </span>
            <span className="font-mono whitespace-nowrap text-sand">
              {formatUsd(line.amount)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-x-4">
        <span className="font-semibold text-canvas">{t("total")}</span>
        <span className="font-mono text-h3 font-semibold whitespace-nowrap text-brand">
          {formatUsd(estimate.total)}
        </span>
      </div>

      <p className="text-label text-sand/50">{t("disclaimer")}</p>

      <Link
        href="/contacts"
        className={buttonVariants({ className: "mt-auto w-full" })}
      >
        {t("cta")}
      </Link>

      <p className="text-center text-label text-sand/50">
        {t("phone")}{" "}
        <a
          href={PHONE_HREF}
          className="text-sand transition-colors duration-200 hover:text-brand"
        >
          {PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}
