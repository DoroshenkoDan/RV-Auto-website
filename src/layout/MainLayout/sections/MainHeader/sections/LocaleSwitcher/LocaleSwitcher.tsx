"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  uk: "UA",
  en: "EN",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("localeSwitcher");
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className={`flex items-center gap-x-1.5 ${className ?? ""}`}
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === activeLocale;

        return (
          <Fragment key={locale}>
            {index > 0 && (
              <span aria-hidden className="text-canvas/30">
                /
              </span>
            )}

            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              aria-current={isActive ? "true" : undefined}
              className={`text-sm uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
                isActive ? "text-brand" : "text-canvas hover:text-brand/70"
              }`}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
