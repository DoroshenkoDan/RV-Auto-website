import { useTranslations } from "next-intl";
import { CarStatus } from "@/lib/payload/cars";

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
        className={`font-sans text-sm md:text-[16px] rounded-[20px] px-2 py-1 md:px-4 md:py-2 border-2 ease-in-out duration-200  ${activeTab === tab ? 'bg-brand border-brand cursor-default' : 'cursor-pointer hover:bg-brand/10 hover:border-brand/30'}`}
        >
          {t(tab)}
        </button>
      ))}
    </div>
  );
}
