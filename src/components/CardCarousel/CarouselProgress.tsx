"use client";

import { useCallback, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/ui/carousel";

const EMPTY = "";
const EVENTS = ["scroll", "select", "reInit"] as const;

function readSnapshot(api: NonNullable<CarouselApi>) {
  const viewport = api.rootNode();
  const container = api.containerNode();
  const ratio = container.scrollWidth
    ? viewport.clientWidth / container.scrollWidth
    : 1;
  const progress = Math.min(Math.max(api.scrollProgress(), 0), 1);
  return `${ratio.toFixed(4)}:${progress.toFixed(4)}`;
}

interface Props {
  api: CarouselApi;
  className?: string;
}

export function CarouselProgress({ api, className = "" }: Props) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};
      EVENTS.forEach((event) => api.on(event, onStoreChange));
      return () => {
        EVENTS.forEach((event) => api.off(event, onStoreChange));
      };
    },
    [api],
  );

  const getSnapshot = useCallback(
    () => (api ? readSnapshot(api) : EMPTY),
    [api],
  );

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  if (!snapshot) return null;

  const [ratio, progress] = snapshot.split(":").map(Number);
  if (ratio >= 1) return null;

  return (
    <div
      aria-hidden
      className={cn("h-1 overflow-hidden rounded-full bg-line", className)}
    >
      <div
        className="h-full rounded-full bg-brand"
        style={{
          width: `${ratio * 100}%`,
          transform: `translateX(${(progress * (1 - ratio) * 100) / ratio}%)`,
        }}
      />
    </div>
  );
}
