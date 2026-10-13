"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { CarMedia } from "@/payload-types";

interface Props {
  photos: CarMedia[];
  selected: number;
  onSelect: (index: number) => void;
  tone?: "light" | "dark";
  className?: string;
}

export function CarThumbnails({
  photos,
  selected,
  onSelect,
  tone = "light",
  className = "",
}: Props) {
  const t = useTranslations("carPage.gallery");
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
  });

  useEffect(() => {
    thumbsApi?.scrollTo(selected);
  }, [thumbsApi, selected]);

  return (
    <div ref={thumbsRef} className={cn("overflow-hidden", className)}>
      <div className="flex gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={t("thumbnail", { index: index + 1 })}
            aria-current={index === selected}
            className={cn(
              "relative aspect-16/10 w-20 shrink-0 cursor-pointer overflow-hidden rounded-sm sm:w-24",
              "outline-2 -outline-offset-2 transition-opacity duration-200 motion-reduce:transition-none",
              "focus-visible:outline-brand",
              tone === "dark" ? "bg-white/10" : "bg-surface",
              index === selected
                ? "outline-brand"
                : "opacity-60 outline-transparent hover:opacity-100",
            )}
          >
            <Image
              src={photo.url as string}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
