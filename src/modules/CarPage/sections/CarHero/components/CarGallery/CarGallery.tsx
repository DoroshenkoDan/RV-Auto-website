"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Car, CarMedia } from "@/payload-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/ui/carousel";

import { CarLightbox } from "../CarLightbox";
import { CarThumbnails } from "../CarThumbnails";

const ARROW = cn(
  "size-(--spacing-control-sm) border-0 bg-night/45 text-white backdrop-blur-sm",
  "hover:bg-night/75 focus-visible:outline-white",
  "disabled:opacity-0 [&_svg]:size-5",
);

interface Props {
  gallery: Car["gallery"];
  alt: string;
  className?: string;
}

export function CarGallery({ gallery, alt, className = "" }: Props) {
  const t = useTranslations("carPage.gallery");
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, start: 0 });
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photos = (gallery ?? []).filter(
    (image): image is CarMedia =>
      typeof image === "object" && Boolean(image?.url),
  );
  const hasMany = photos.length > 1;

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    setSelected(mainApi.selectedScrollSnap());
  }, [mainApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  if (photos.length === 0) return null;

  const openLightbox = () => {
    setLightbox({ open: true, start: selected });
    setLightboxIndex(selected);
  };

  const handleLightboxOpenChange = (open: boolean) => {
    if (!open) mainApi?.scrollTo(lightboxIndex, true);
    setLightbox((current) => ({ ...current, open }));
  };

  return (
    <div className={className}>
      <Carousel
        setApi={setMainApi}
        className="overflow-hidden rounded-lg bg-surface max-sm:-mx-6 max-sm:rounded-none"
      >
        <CarouselContent className="ml-0">
          {photos.map((photo, index) => (
            <CarouselItem key={photo.id} className="pl-0">
              <button
                type="button"
                onClick={openLightbox}
                aria-label={t("open")}
                className="relative block aspect-16/10 w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
              >
                <Image
                  src={photo.url as string}
                  alt={`${alt}, ${t("counter", { current: index + 1, total: photos.length })}`}
                  fill
                  preload={index === 0}
                  sizes="(min-width: 1536px) 900px, (min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMany && (
          <>
            <CarouselPrevious
              aria-label={t("prev")}
              className={cn(ARROW, "left-3")}
            />
            <CarouselNext
              aria-label={t("next")}
              className={cn(ARROW, "right-3")}
            />
          </>
        )}

        <div className="absolute right-3 bottom-3 flex flex-col items-end gap-2">
          {hasMany && (
            <span className="rounded-full bg-night/60 px-2.5 py-1 font-mono text-caption text-white backdrop-blur-sm">
              {t("counter", { current: selected + 1, total: photos.length })}
            </span>
          )}
          <button
            type="button"
            onClick={openLightbox}
            aria-label={t("open")}
            className={cn(
              "inline-flex size-(--spacing-control-sm) cursor-pointer items-center justify-center rounded-full bg-night/45 text-white backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-night/75 motion-reduce:transition-none",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            )}
          >
            <Maximize2 aria-hidden className="size-5" />
          </button>
        </div>
      </Carousel>

      {hasMany && (
        <CarThumbnails
          photos={photos}
          selected={selected}
          onSelect={(index) => mainApi?.scrollTo(index)}
          className="mt-2"
        />
      )}

      <CarLightbox
        photos={photos}
        alt={alt}
        open={lightbox.open}
        startIndex={lightbox.start}
        index={lightboxIndex}
        onOpenChange={handleLightboxOpenChange}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
