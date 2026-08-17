"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import {
  isNavGroupActive,
  isNavItemActive,
  type NavGroup,
} from "@/layout/MainLayout/navItems";
import { cn } from "@/lib/utils";

import { navEntryClass, navUnderlineClass } from "../../navStyles";

export function ServicesMenu({ group }: { group: NavGroup }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = isNavGroupActive(pathname, group);

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        className={navEntryClass(isActive, "data-popup-open:text-brand/70")}
      >
        {t(group.key)}

        <NavigationMenu.Icon className="transition-transform duration-300 ease-out data-popup-open:rotate-180 motion-reduce:transition-none">
          <ChevronDown aria-hidden className="size-3.5" />
        </NavigationMenu.Icon>

        <span
          aria-hidden
          className={navUnderlineClass(
            isActive,
            "group-data-popup-open:scale-x-100",
          )}
        />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        keepMounted
        className="w-max py-2 transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      >
        <ul className="flex min-w-56 flex-col">
          {group.children.map(({ href, key }) => {
            const isChildActive = isNavItemActive(pathname, href);

            return (
              <li key={href}>
                <NavigationMenu.Link
                  render={<Link href={href} />}
                  aria-current={isChildActive ? "page" : undefined}
                  className={cn(
                    "block px-5 py-3 text-nav tracking-nav whitespace-nowrap uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                    isChildActive
                      ? "text-brand"
                      : "text-canvas/75 hover:bg-canvas/5 hover:text-brand",
                  )}
                >
                  {t(key)}
                </NavigationMenu.Link>
              </li>
            );
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
