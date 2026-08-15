import { useTranslations } from "next-intl";

import { CarStatus } from "@/lib/payload/cars";
import { cn } from "@/lib/utils";

type Tab = "all" | CarStatus;
const TABS: Tab[] = ["all", "available", "inTransit", "auction"];

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

/**
 *  CatalogTabSwitcher
 *  @param activeTab
 *  @param onTabChange
 */

export function CatalogTabSwitcher({ activeTab, onTabChange }: Props) {
  const t = useTranslations("homePage.catalog.tabs");

  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "rounded-[20px] border-2 px-2 py-1 font-sans text-sm duration-200 ease-in-out md:px-4 md:py-2 md:text-[16px]",
            activeTab === tab
              ? "cursor-default border-brand bg-brand"
              : "cursor-pointer hover:border-brand/30 hover:bg-brand/10",
          )}
        >
          {t(tab)}
        </button>
      ))}
    </div>
  );
}
