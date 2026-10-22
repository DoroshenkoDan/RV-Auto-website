"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { PanelGlow } from "@/components/PanelGlow";
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
    <Section id="calculator" className="scroll-mt-(--header-h)">
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

          <PanelGlow />
        </div>
      </div>
    </Section>
  );
}
