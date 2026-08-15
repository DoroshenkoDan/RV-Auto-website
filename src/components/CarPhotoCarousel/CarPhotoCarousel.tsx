import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Car, Media } from "@/payload-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";

interface Props {
  gallery: Car["gallery"];
  alt: string;
  className?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  fill?: boolean;
  sizes?: string;
  /** Show the prev/next arrows only while the carousel is hovered or focused. */
  revealControlsOnHover?: boolean;
}

export function CarPhotoCarousel({
  gallery,
  alt,
  className = "",
  imageClassName = "",
  imageWidth = 300,
  imageHeight = 200,
  fill = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  revealControlsOnHover = false,
}: Props) {
  const photos = gallery
    .map((item) => item.image)
    .filter(
      (image): image is Media =>
        typeof image === "object" && Boolean(image?.url),
    );

  if (photos.length === 0) return null;

  const controlsClassName = cn(
    "size-9 rounded-full border-0 bg-night/45 text-white ring-0 backdrop-blur-sm",
    "hover:bg-night/75 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70",
    "cursor-pointer disabled:opacity-0 [&_svg]:size-5",
    revealControlsOnHover &&
      "opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 focus-visible:opacity-100 motion-reduce:transition-none",
  );

  return (
    <Carousel
      className={cn("group/carousel relative", fill && "h-full", className)}
    >
      <CarouselContent className={cn(fill && "ml-0 h-full")}>
        {photos.map((photo) => (
          <CarouselItem key={photo.id} className={cn(fill && "h-full pl-0")}>
            {fill ? (
              <div className="relative h-full w-full">
                <Image
                  src={photo.url as string}
                  alt={alt}
                  fill
                  sizes={sizes}
                  className={cn("object-cover", imageClassName)}
                />
              </div>
            ) : (
              <Image
                src={photo.url as string}
                alt={alt}
                width={imageWidth}
                height={imageHeight}
                className={imageClassName}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      {photos.length > 1 && (
        <>
          <CarouselPrevious
            variant="ghost"
            className={cn("left-3", controlsClassName)}
          />
          <CarouselNext
            variant="ghost"
            className={cn("right-3", controlsClassName)}
          />
        </>
      )}
    </Carousel>
  );
}
