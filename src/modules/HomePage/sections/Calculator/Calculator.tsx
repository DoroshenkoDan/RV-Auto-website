"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

import { estimate } from "./estimate";
import { CalculatorForm } from "./components/CalculatorForm";
import { CalculatorIdle } from "./components/CalculatorIdle";
import { CalculatorResult } from "./components/CalculatorResult";
import type { CalculatorEstimate } from "./types";

export function Calculator() {
  const t = useTranslations("homePage.calculator");

  const [result, setResult] = useState<CalculatorEstimate | null>(null);

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      <div className="grid rounded-md border border-line lg:grid-cols-2">
        <CalculatorForm onCalculate={(input) => setResult(estimate(input))} />

        <div className="relative isolate overflow-hidden rounded-br-md rounded-bl-md bg-ink p-6 lg:rounded-tr-md lg:rounded-bl-none lg:p-8 2xl:p-12">
          {result ? <CalculatorResult estimate={result} /> : <CalculatorIdle />}

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
    </Section>
  );
}
