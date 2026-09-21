import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { estimate } from "@/lib/calculator/estimate";
import { cn, formatUsd } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

import { FAQ_LINKS } from "../../faqConfig";

const EXAMPLE_AGE = 6;

const EXAMPLE_LOT_PRICE = 8000;

const LINE_TONES = [
  "bg-brand",
  "bg-brand/85",
  "bg-brand/70",
  "bg-brand/55",
  "bg-brand/45",
  "bg-brand/35",
  "bg-brand/25",
];

export function CostExample() {
  const t = useTranslations("faqPage.costExample");
  const tLines = useTranslations("homePage.calculator.result.lines");

  const year = new Date().getFullYear() - EXAMPLE_AGE;
  const result = estimate({
    fuel: "petrol",
    vehicle: "car",
    auction: "copart",
    engineVolume: 2000,
    batteryCapacity: null,
    year,
    lotPrice: EXAMPLE_LOT_PRICE,
  });

  if (!result) {
    return null;
  }

  return (
    <section
      id="cost-example"
      aria-labelledby="cost-example-title"
      className="relative isolate grid gap-block overflow-hidden rounded-lg bg-ink p-block text-sand xl:grid-cols-[1fr_1.25fr]"
    >
      <div className="flex flex-col">
        <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
          [{t("eyebrow")}]
        </p>

        <h3
          id="cost-example-title"
          className="mt-3 font-logo text-h3 font-bold text-sand"
        >
          {t("title")}
        </h3>

        <p className="mt-3 text-body text-sand/70">
          {t("description", { year, lot: formatUsd(EXAMPLE_LOT_PRICE) })}
        </p>

        <p className="mt-3 text-label text-sand/50">{t("disclaimer")}</p>

        <Link
          href={FAQ_LINKS.calculator}
          className={buttonVariants({
            className: "mt-stack w-full sm:w-auto sm:self-start xl:mt-auto",
          })}
        >
          {t("cta")}
        </Link>
      </div>

      <div className="flex flex-col gap-y-stack">
        <div
          aria-hidden
          className="flex h-1.5 w-full overflow-hidden rounded-full bg-sand/10"
        >
          {result.lines.map((line, index) => (
            <span
              key={line.key}
              style={{ width: `${(line.amount / result.total) * 100}%` }}
              className={LINE_TONES[index]}
            />
          ))}
        </div>

        <ul className="flex flex-col">
          {result.lines.map((line, index) => (
            <li
              key={line.key}
              className="flex items-start justify-between gap-x-4 border-b border-sand/10 py-3"
            >
              <span className="flex gap-x-3">
                <span
                  aria-hidden
                  className={cn("mt-2 size-2 shrink-0", LINE_TONES[index])}
                />
                <span className="flex flex-col gap-1">
                  <span className="font-semibold text-sand">
                    {tLines(line.key)}
                  </span>
                  <span className="text-label text-sand/55">
                    {t(`lines.${line.key}`)}
                  </span>
                </span>
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
            {formatUsd(result.total)}
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand/25 blur-3xl"
      />
    </section>
  );
}
