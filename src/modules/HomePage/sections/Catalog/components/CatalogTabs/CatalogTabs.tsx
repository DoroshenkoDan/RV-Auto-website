"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/EmptyState";
import type { Car } from "@/payload-types";
import type { CarStatus } from "@/lib/payload/cars";
import { SegmentedControl } from "@/ui/segmented-control";
import { CatalogGrid } from "../CatalogGrid";

type Tab = "all" | CarStatus;
const TABS: Tab[] = ["all", "available", "inTransit", "auction"];
const MAX_CARDS = 6;

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
      {filteredCars.length > 0 ? (
        <CatalogGrid cars={filteredCars} resetKey={activeTab} />
      ) : (
        <EmptyState
          eyebrow={tCatalog("emptyFilter.eyebrow")}
          title={tCatalog("emptyFilter.title")}
          description={tCatalog("emptyFilter.description")}
        />
      )}
    </div>
  );
}
