"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Car } from "@/payload-types";
import type { CarStatus } from "@/lib/payload/cars";
import { SegmentedControl } from "@/ui/segmented-control";
import { CatalogGrid } from "../CatalogGrid";

type Tab = "all" | CarStatus;
const TABS: Tab[] = ["all", "available", "inTransit", "auction"];
const MAX_CARDS = 6;
// TODO: add empty state for tabs with no featured cars of the selected status

interface Props {
  cars: Car[];
}

export function CatalogTabs({ cars }: Props) {
  const t = useTranslations("homePage.catalog.tabs");
  const tCatalog = useTranslations("catalogPage");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const filteredCars = (
    activeTab === "all" ? cars : cars.filter((car) => car.status === activeTab)
  ).slice(0, MAX_CARDS);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-y-stack">
      <SegmentedControl<Tab>
        options={TABS.map((tab) => ({ value: tab, label: t(tab) }))}
        value={activeTab}
        onValueChange={setActiveTab}
        aria-label={tCatalog("status")}
        size="sm"
      />
      <CatalogGrid cars={filteredCars} resetKey={activeTab} />
    </div>
  );
}
