"use client";

import { useState } from "react";
import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import {
  isNavGroupActive,
  isNavItemActive,
  type NavGroup,
} from "@/layout/MainLayout/navItems";
import { cn } from "@/lib/utils";

export function MobileServicesGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = isNavGroupActive(pathname, group);
  const [value, setValue] = useState<string[]>(isActive ? [group.key] : []);

  return (
    <Accordion.Root value={value} onValueChange={setValue}>
      <Accordion.Item value={group.key}>
        <Accordion.Header>
          <Accordion.Trigger
            className={cn(
              "group flex w-full items-center gap-x-2.5 py-2 text-left text-h3 tracking-[0.16em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
              isActive ? "text-brand" : "text-canvas hover:text-brand/70",
            )}
          >
            {t(group.key)}

            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 transition-transform duration-300 ease-out group-data-panel-open:rotate-180 motion-reduce:transition-none"
            />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
          <ul className="flex flex-col gap-y-0.5 border-l border-canvas/15 pt-1 pb-2 pl-4">
            {group.children.map(({ href, key }) => {
              const isChildActive = isNavItemActive(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={isChildActive ? "page" : undefined}
                    className={cn(
                      "block py-1.5 text-nav tracking-nav uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                      isChildActive
                        ? "text-brand"
                        : "text-canvas/75 hover:text-brand/70",
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
