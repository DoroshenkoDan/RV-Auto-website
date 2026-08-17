"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import {
  isNavGroup,
  isNavItemActive,
  NAV_ITEMS,
} from "@/layout/MainLayout/navItems";

import { navEntryClass, navUnderlineClass } from "./navStyles";
import { ServicesMenu } from "./sections/ServicesMenu";

export function MainNav({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <NavigationMenu.Root className={className}>
      <NavigationMenu.List className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {NAV_ITEMS.map((item) => {
          if (isNavGroup(item)) {
            return <ServicesMenu key={item.key} group={item} />;
          }

          const isActive = isNavItemActive(pathname, item.href);

          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link
                render={<Link href={item.href} />}
                aria-current={isActive ? "page" : undefined}
                className={navEntryClass(isActive)}
              >
                {t(item.key)}

                <span aria-hidden className={navUnderlineClass(isActive)} />
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={14}
          collisionPadding={{ left: 24, right: 24 }}
          collisionAvoidance={{ side: "none" }}
          /* The `before` strip bridges the gap to the trigger so hover survives the trip. */
          className="z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-300 ease-out before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5 before:content-[''] data-instant:transition-none motion-reduce:transition-none"
        >
          <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-sm border border-canvas/10 bg-night/95 text-canvas shadow-[0_16px_40px_--alpha(var(--color-night)/60%)] backdrop-blur-md transition-[opacity,transform,width,height] duration-300 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
