"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { estimate } from "./estimate"
import { CalculatorForm } from "./sections/CalculatorForm"
import { CalculatorIdle } from "./sections/CalculatorIdle"
import { CalculatorResult } from "./sections/CalculatorResult"
import type { CalculatorEstimate } from "./types"

export function Calculator() {
  const t = useTranslations("calculator")

  const [result, setResult] = useState<CalculatorEstimate | null>(null)

  return (
    <section className="bg-canvas py-16 lg:py-20 2xl:py-24">
      <div className="page-shell">
        <h2 className="text-center text-2xl leading-tight font-bold lg:text-3xl 2xl:text-4xl font-logo">
          {t("title")}
        </h2>

        <div className="mt-8 grid lg:mt-10 lg:grid-cols-2 2xl:mt-12 rounded-md border border-line">
          <CalculatorForm onCalculate={(input) => setResult(estimate(input))} />

          <div className="relative isolate overflow-hidden bg-ink p-6 rounded-r-md lg:p-8 2xl:p-12">
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
  )
}
