import { CardCarousel } from "@/components/CardCarousel";
import { CatalogCard } from "@/components/CatalogCard";
import type { Car } from "@/payload-types";

interface Props {
  className?: string;
  cars: Car[];
  resetKey?: string | number;
}

export function CatalogGrid({ className = "", cars, resetKey }: Props) {
  return (
    <CardCarousel
      stopAt="lg"
      resetKey={resetKey}
      className={className}
      itemClassName="basis-[85%] sm:basis-1/2 lg:basis-auto"
    >
      {cars.map((car) => (
        <CatalogCard key={car.id} car={car} className="h-full" />
      ))}
    </CardCarousel>
  );
}
