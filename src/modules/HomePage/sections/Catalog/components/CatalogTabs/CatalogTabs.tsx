"use client";
import { useState } from "react";
import type { Car } from "@/payload-types";
import type { CarStatus } from "@/lib/payload/cars";
import { CatalogTabSwitcher } from "../CatalogTabSwitcher";
import { CatalogGrid } from "../CatalogGrid";

type Tab = "all" | CarStatus;
const MAX_CARDS = 6;

interface Props {
  cars: Car[];
}

export function CatalogTabs({ cars }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const filteredCars = (
    activeTab === "all" ? cars : cars.filter((car) => car.status === activeTab)
  ).slice(0, MAX_CARDS);

  return (
    <div>
      <CatalogTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      <CatalogGrid cars={filteredCars} />
    </div>
  );
}
