"use client";

import { useEffect, useState, useTransition } from "react";
import { flushSync } from "react-dom";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { CAR_SORTS, toCatalogQuery, type CarSort } from "@/lib/catalog/params";
import type { CarStatus } from "@/lib/payload/cars";
import { cn } from "@/lib/utils";
import { segmentedGroup, segmentedItem } from "@/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

type StatusTab = "all" | CarStatus;

const STATUS_TABS: StatusTab[] = ["all", "available", "inTransit", "auction"];

interface Props {
  status?: CarStatus;
  sort: CarSort;
  counts: Record<StatusTab, number>;
  className?: string;
}

export function CatalogToolbar({ status, sort, counts, className }: Props) {
  const t = useTranslations("catalogPage");
  const tTabs = useTranslations("homePage.catalog.tabs");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [closesInstantly, setClosesInstantly] = useState(false);

  useEffect(() => {
    if (!isSortOpen) return;

    const closeOnScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("[data-slot=select-content]")
      ) {
        return;
      }
      flushSync(() => {
        setClosesInstantly(true);
        setIsSortOpen(false);
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
  }, [isSortOpen]);

  function handleSortOpenChange(open: boolean) {
    if (open) setClosesInstantly(false);
    setIsSortOpen(open);
  }

  function navigate(next: { status?: CarStatus; sort: CarSort }) {
    startTransition(() => {
      router.push(
        { pathname: "/cars", query: toCatalogQuery(next) },
        { scroll: false },
      );
    });
  }

  const sortItems = CAR_SORTS.map((value) => ({
    value,
    label: t(`sort.${value}`),
  }));

  return (
    <div
      aria-busy={isPending || undefined}
      className={cn(
        "flex flex-col gap-stack lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <ToggleGroup
        aria-label={t("status")}
        value={[status ?? "all"]}
        onValueChange={([next]) => {
          if (!next) return;
          navigate({
            status: next === "all" ? undefined : (next as CarStatus),
            sort,
          });
        }}
        spacing={1}
        className={segmentedGroup({
          tone: "dark",
          className: "grid w-full grid-cols-2 sm:flex sm:w-fit",
        })}
      >
        {STATUS_TABS.map((tab) => (
          <ToggleGroupItem
            key={tab}
            value={tab}
            className={segmentedItem({
              tone: "dark",
              className:
                "group/tab h-control-sm w-full min-w-0 gap-2 px-3 hover:bg-transparent aria-pressed:bg-brand aria-pressed:font-semibold aria-pressed:text-night-soft aria-pressed:hover:text-night-soft sm:w-auto sm:px-4",
            })}
          >
            <span className="truncate">{tTabs(tab)}</span>
            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-sand/10 px-1.5 text-caption leading-none font-medium tabular-nums group-aria-pressed/tab:bg-night-soft/15">
              {counts[tab]}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex items-center gap-3">
        <span className="shrink-0 text-label text-sand/60">
          {t("sort.label")}
        </span>
        <Select
          items={sortItems}
          modal={false}
          open={isSortOpen}
          onOpenChange={handleSortOpenChange}
          value={sort}
          onValueChange={(next) => {
            if (next) navigate({ status, sort: next as CarSort });
          }}
        >
          <SelectTrigger
            aria-label={t("sort.label")}
            className="min-w-0 flex-1 cursor-pointer rounded-sm border-sand/12 bg-night-soft px-4 text-control text-sand hover:border-sand/30 focus-visible:border-brand focus-visible:ring-brand/30 data-[size=default]:h-control-sm sm:min-w-60 sm:flex-initial [&_svg]:text-sand/60"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            alignItemWithTrigger={false}
            className={cn(
              "rounded-sm bg-night-soft p-1 text-sand ring-sand/12",
              closesInstantly &&
                "data-closed:invisible! data-closed:animate-none! data-closed:duration-0!",
            )}
          >
            {sortItems.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer rounded-[4px] py-2 text-control focus:bg-sand/20 focus:text-sand not-data-[variant=destructive]:focus:**:text-sand data-selected:text-brand"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
