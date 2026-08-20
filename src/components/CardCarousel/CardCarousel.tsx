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

const STOP_AT_LG = "(min-width: 64rem)";
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
  stopAt?: "lg";
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

  const stopsAtLg = stopAt === "lg";

  return (
    <div className={className}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          watchDrag,
          ...(stopsAtLg && {
            breakpoints: { [STOP_AT_LG]: { active: false } },
          }),
        }}
      >
        <CarouselContent
          className={cn(
            stopsAtLg && "lg:ml-0 lg:grid lg:grid-cols-3 lg:gap-stack",
          )}
        >
          {Children.map(children, (child) => (
            <CarouselItem className={cn(stopsAtLg && "lg:pl-0", itemClassName)}>
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <CarouselPrevious
              className={cn(ARROW, "-left-3", stopsAtLg && "lg:hidden")}
            />
            <CarouselNext
              className={cn(ARROW, "-right-3", stopsAtLg && "lg:hidden")}
            />
          </>
        )}
      </Carousel>

      {count > 1 && (
        <CarouselProgress
          api={api}
          className={cn("mt-stack", stopsAtLg && "lg:hidden")}
        />
      )}
    </div>
  );
}
