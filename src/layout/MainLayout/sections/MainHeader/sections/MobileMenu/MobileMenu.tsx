"use client"

import { useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { isNavItemActive, NAV_ITEMS } from "@/layout/MainLayout/navItems"

const BAR = "absolute inset-x-0 h-0.5 rounded-full bg-current"
const BAR_MOTION = "transition duration-300 ease-out motion-reduce:transition-none"

export function MobileMenu({ className }: { className?: string }) {
  const t = useTranslations("nav")
  const tMenu = useTranslations("mobileMenu")
  const tActions = useTranslations("headerActions")
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={open ? tMenu("close") : tMenu("open")}
        className={`group inline-flex size-11 items-center justify-center text-canvas transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className ?? ""}`}
      >
        <span aria-hidden className="relative block h-4 w-7">
          <span
            className={`${BAR} ${BAR_MOTION} top-0 group-data-popup-open:translate-y-1.75 group-data-popup-open:rotate-45`}
          />
          <span
            className={`${BAR} ${BAR_MOTION} top-1/2 -translate-y-1/2 group-data-popup-open:scale-x-0 group-data-popup-open:opacity-0`}
          />
          <span
            className={`${BAR} ${BAR_MOTION} bottom-0 group-data-popup-open:-translate-y-1.75 group-data-popup-open:-rotate-45`}
          />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night pt-16 text-canvas transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none sm:pt-18">
          <Dialog.Close className="sr-only">{tMenu("close")}</Dialog.Close>

          <Dialog.Title className="sr-only">{tMenu("title")}</Dialog.Title>

          <nav className="page-shell flex flex-1 flex-col justify-center py-8">
            <ul className="flex flex-col gap-y-2">
              {NAV_ITEMS.map(({ href, key }) => {
                const isActive = isNavItemActive(pathname, href)

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-3 text-2xl uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${isActive ? "text-brand" : "text-canvas hover:text-brand/70"
                        }`}
                    >
                      {t(key)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="page-shell border-t border-canvas/10 py-6">
            <Link
              href="/contacts"
              onClick={() => setOpen(false)}
              className="block rounded-md bg-brand px-5 py-4 text-center uppercase tracking-[0.16em] text-base text-night shadow-[0_0_16px_--alpha(var(--color-neon)/30%)] transition duration-300 hover:bg-brand/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {tActions("contact")}
            </Link>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
