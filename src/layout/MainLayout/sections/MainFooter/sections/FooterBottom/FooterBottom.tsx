import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"

import { LEGAL_ITEMS } from "../../legalItems"

export function FooterBottom({ className }: { className?: string }) {
  const t = useTranslations("footer")

  return (
    <div
      className={`flex flex-col items-center gap-y-4 border-t border-sand/12 pt-6 sm:flex-row sm:justify-between ${className ?? ""}`}
    >
      <p className="font-mono text-xs leading-[1.5] text-sand/45">
        {t("copyright", { year: new Date().getFullYear().toString() })}
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {LEGAL_ITEMS.map(({ href, key }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-xs leading-[1.5] text-sand/45 transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
