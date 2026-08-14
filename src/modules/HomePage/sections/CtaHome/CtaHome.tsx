import { useTranslations } from "next-intl"

import { ContactForm } from "@/components/ContactForm"

export function CtaHome() {
  const t = useTranslations("homePage.ctaHome")

  return (
    <section className="relative isolate overflow-hidden bg-night py-16 lg:py-20 2xl:py-24">
      <div className="page-shell">
        <h2 className="mx-auto max-w-2xl text-center text-2xl leading-tight font-bold text-canvas lg:text-3xl 2xl:text-4xl font-logo">
          {t("title")}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-normal text-sand/60 lg:mt-5">
          {t("description")}
        </p>

        <ContactForm layout="row" className="mx-auto mt-8 max-w-3xl lg:mt-10" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-20 -z-10 size-120 -translate-x-1/2 rounded-full bg-brand/12 blur-2xl"
      />
    </section>
  )
}
