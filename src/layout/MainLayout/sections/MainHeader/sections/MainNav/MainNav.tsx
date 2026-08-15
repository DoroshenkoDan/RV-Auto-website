"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { isNavItemActive, NAV_ITEMS } from "@/layout/MainLayout/navItems";
import { cn } from "@/lib/utils";

export function MainNav({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {NAV_ITEMS.map(({ href, key }) => {
          const isActive = isNavItemActive(pathname, href);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative inline-block tracking-[0.16em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                  isActive ? "text-brand" : "text-canvas hover:text-brand/70",
                )}
              >
                {t(key)}

                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 transition-transform duration-300 ease-out motion-reduce:transition-none",
                    isActive
                      ? "scale-x-100 bg-brand"
                      : "scale-x-0 bg-brand/70 group-hover:scale-x-100",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
