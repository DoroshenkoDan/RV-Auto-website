"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { CarMedia } from "@/payload-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/ui/carousel";

import { CarThumbnails } from "../CarThumbnails";

const CONTROL = cn(
  "inline-flex size-(--spacing-control) cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white",
  "transition-colors duration-200 hover:bg-white/20 motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  "disabled:opacity-0 [&_svg]:size-6",
);

interface Props {
  photos: CarMedia[];
  alt: string;
  open: boolean;
  startIndex: number;
  index: number;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

export function CarLightbox({
  photos,
  alt,
  open,
  startIndex,
  index,
  onOpenChange,
  onIndexChange,
}: Props) {
  const t = useTranslations("carPage.gallery");
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => onIndexChange(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onIndexChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  const hasMany = photos.length > 1;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Popup
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-60 flex flex-col bg-night text-white transition-opacity duration-200 ease-out outline-none data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>

          <div className="flex items-center justify-between gap-4 p-4">
            <span className="font-mono text-label text-white/70">
              {hasMany &&
                t("counter", { current: index + 1, total: photos.length })}
            </span>
            <Dialog.Close aria-label={t("close")} className={CONTROL}>
              <X aria-hidden />
            </Dialog.Close>
          </div>

          <Carousel
            setApi={setApi}
            opts={{ startIndex }}
            className="min-h-0 flex-1"
          >
            <CarouselContent className="ml-0">
              {photos.map((photo, photoIndex) => (
                <CarouselItem key={photo.id} className="pl-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={photo.url as string}
                      alt={`${alt}, ${t("counter", { current: photoIndex + 1, total: photos.length })}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {hasMany && (
              <>
                <CarouselPrevious
                  aria-label={t("prev")}
                  className={cn(CONTROL, "left-4 hidden md:inline-flex")}
                />
                <CarouselNext
                  aria-label={t("next")}
                  className={cn(CONTROL, "right-4 hidden md:inline-flex")}
                />
              </>
            )}
          </Carousel>

          {hasMany && (
            <div className="shrink-0 p-4 [@media(max-height:30rem)]:hidden">
              <CarThumbnails
                photos={photos}
                selected={index}
                onSelect={(next) => api?.scrollTo(next)}
                tone="dark"
                className="mx-auto max-w-max"
              />
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
