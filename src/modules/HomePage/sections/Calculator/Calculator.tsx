"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { estimate } from "@/lib/calculator/estimate";
import type {
  CalculatorEstimate,
  CalculatorInput,
} from "@/lib/calculator/types";
import { Section, SectionTitle } from "@/ui/section";

import { CalculatorForm } from "./components/CalculatorForm";
import { CalculatorIdle } from "./components/CalculatorIdle";
import { CalculatorResult } from "./components/CalculatorResult";

export function Calculator() {
  const t = useTranslations("homePage.calculator");

  const [result, setResult] = useState<{
    input: CalculatorInput;
    estimate: CalculatorEstimate;
  } | null>(null);

  return (
    <Section>
      <SectionTitle align="center">{t("title")}</SectionTitle>

      <div className="grid rounded-md border border-line lg:grid-cols-2">
        <CalculatorForm
          onCalculate={(input) => {
            const next = estimate(input);

            setResult(next ? { input, estimate: next } : null);
          }}
        />

        <div className="relative isolate overflow-hidden rounded-br-md rounded-bl-md bg-ink p-block lg:rounded-tr-md lg:rounded-bl-none">
          {result ? (
            <CalculatorResult input={result.input} estimate={result.estimate} />
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
    </Section>
  );
}
