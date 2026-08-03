import { Tooltip } from "@base-ui/react/tooltip"
import { useTranslations } from "next-intl"

import { Logo } from "@/components/Logo"
import { SocialIcon } from "@/components/SocialIcon"
import { SOCIAL_LINKS } from "@/lib/contacts"

export function FooterBrand({ className }: { className?: string }) {
  const t = useTranslations("footer")

  return (
    <div className={`flex flex-col items-start gap-y-3 ${className ?? ""}`}>
      <Logo />

      <p className="text-sm leading-[1.6] text-sand/55">{t("tagline")}</p>

      <Tooltip.Provider>
        <ul className="flex items-center gap-x-4 pt-3">
          {SOCIAL_LINKS.map(({ name, href }) => (
            <li key={name}>
              <Tooltip.Root>
                <Tooltip.Trigger
                  delay={150}
                  aria-label={name}
                  className="block text-sand/70 transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  render={<a href={href} target="_blank" rel="noreferrer" />}
                >
                  <SocialIcon name={name} className="size-5" />
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Positioner sideOffset={10}>
                    <Tooltip.Popup className="origin-[var(--transform-origin)] rounded-sm bg-sand px-2 py-1 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-night transition-[transform,opacity] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none">
                      {name}
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </li>
          ))}
        </ul>
      </Tooltip.Provider>
    </div>
  )
}
