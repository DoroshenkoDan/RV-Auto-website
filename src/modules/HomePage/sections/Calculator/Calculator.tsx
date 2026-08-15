"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { estimate } from "./estimate";
import { CalculatorForm } from "./components/CalculatorForm";
import { CalculatorIdle } from "./components/CalculatorIdle";
import { CalculatorResult } from "./components/CalculatorResult";
import type { CalculatorEstimate } from "./types";

export function Calculator() {
  const t = useTranslations("homePage.calculator");

  const [result, setResult] = useState<CalculatorEstimate | null>(null);

  return (
    <section className="bg-canvas py-16 lg:py-20 2xl:py-24">
      <div className="page-shell">
        <h2 className="text-center font-logo text-2xl leading-tight font-bold lg:text-3xl 2xl:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-8 grid rounded-md border border-line lg:mt-10 lg:grid-cols-2 2xl:mt-12">
          <CalculatorForm onCalculate={(input) => setResult(estimate(input))} />

          <div className="relative isolate overflow-hidden rounded-br-md rounded-bl-md bg-ink p-6 lg:rounded-tr-md lg:rounded-bl-none lg:p-8 2xl:p-12">
            {result ? (
              <CalculatorResult estimate={result} />
            ) : (
              <CalculatorIdle />
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand/35 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -bottom-32 -z-10 size-56 rounded-full bg-neon/20 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
