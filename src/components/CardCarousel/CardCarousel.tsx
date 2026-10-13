"use client";

import { Children, useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/ui/carousel";

import { CarouselProgress } from "./CarouselProgress";

const STOP_AT = {
  lg: {
    query: "(min-width: 64rem)",
    content: "lg:ml-0 lg:grid lg:grid-cols-3 lg:gap-stack",
    item: "lg:pl-0",
    hidden: "lg:hidden",
  },
  xl: {
    query: "(min-width: 80rem)",
    content: "xl:ml-0 xl:grid xl:grid-cols-4 xl:gap-stack",
    item: "xl:pl-0",
    hidden: "xl:hidden",
  },
} as const;
const ARROW = [
  "hidden md:inline-flex",
  "size-(--spacing-control-sm) rounded-sm border-0 bg-night text-sand",
  "hover:bg-brand hover:text-night-soft",
  "active:scale-[0.98] disabled:opacity-40",
  "transition-colors duration-200 motion-reduce:transition-none",
].join(" ");

function watchDrag(
  api: NonNullable<CarouselApi>,
  event: MouseEvent | TouchEvent,
) {
  const target = event.target;
  if (!(target instanceof Element)) return true;
  const nested = target.closest('[data-slot="carousel"]');
  const own = api.rootNode().closest('[data-slot="carousel"]');
  return !nested || nested === own;
}

interface Props {
  children: ReactNode;
  stopAt?: keyof typeof STOP_AT;
  resetKey?: string | number;
  className?: string;
  itemClassName?: string;
}

export function CardCarousel({
  children,
  stopAt,
  resetKey,
  className = "",
  itemClassName = "",
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const count = Children.count(children);

  useEffect(() => {
    api?.scrollTo(0, true);
  }, [api, resetKey]);

  if (count === 0) return null;

  const stop = stopAt ? STOP_AT[stopAt] : null;

  return (
    <div className={className}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          watchDrag,
          ...(stop && {
            breakpoints: { [stop.query]: { active: false } },
          }),
        }}
      >
        <CarouselContent className={cn(stop?.content)}>
          {Children.map(children, (child) => (
            <CarouselItem className={cn(stop?.item, itemClassName)}>
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <CarouselPrevious className={cn(ARROW, "-left-3", stop?.hidden)} />
            <CarouselNext className={cn(ARROW, "-right-3", stop?.hidden)} />
          </>
        )}
      </Carousel>

      {count > 1 && (
        <CarouselProgress api={api} className={cn("mt-stack", stop?.hidden)} />
      )}
    </div>
  );
}
