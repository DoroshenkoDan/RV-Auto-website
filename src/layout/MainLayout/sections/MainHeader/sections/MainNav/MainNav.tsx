"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import {
  isNavGroup,
  isNavItemActive,
  NAV_ITEMS,
} from "@/layout/MainLayout/navItems";
import { cn } from "@/lib/utils";

import { navEntryClass, navUnderlineClass } from "./navStyles";
import { ServicesMenu } from "./sections/ServicesMenu";

export function MainNav({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [openValue, setOpenValue] = useState<string | null>(null);
  const [closesInstantly, setClosesInstantly] = useState(false);

  useEffect(() => {
    if (openValue === null) return;

    const closeOnScroll = () => {
      flushSync(() => {
        setClosesInstantly(true);
        setOpenValue(null);
      });
    };

    const events = ["wheel", "touchmove", "scroll"] as const;
    for (const type of events) {
      window.addEventListener(type, closeOnScroll, {
        capture: true,
        passive: true,
      });
    }

    return () => {
      for (const type of events) {
        window.removeEventListener(type, closeOnScroll, { capture: true });
      }
    };
  }, [openValue]);

  function handleValueChange(next: string | null) {
    if (next !== null) setClosesInstantly(false);
    setOpenValue(next);
  }

  return (
    <NavigationMenu.Root
      value={openValue}
      onValueChange={handleValueChange}
      className={className}
    >
      <NavigationMenu.List className="flex items-center justify-center gap-x-nav">
        {NAV_ITEMS.map((item) => {
          if (isNavGroup(item)) {
            return (
              <ServicesMenu
                key={item.key}
                group={item}
                closesInstantly={closesInstantly}
              />
            );
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
          className={cn(
            "z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-300 ease-out before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5 before:content-[''] data-instant:transition-none motion-reduce:transition-none",
            closesInstantly && "transition-none",
          )}
        >
          <NavigationMenu.Popup
            className={cn(
              "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-sm border border-canvas/10 bg-night/95 text-canvas shadow-[0_16px_40px_--alpha(var(--color-night)/60%)] backdrop-blur-md transition-[opacity,scale,width,height] duration-300 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
              closesInstantly &&
                "data-ending-style:invisible data-ending-style:transition-none",
            )}
          >
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
