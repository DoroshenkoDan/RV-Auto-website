import { cn } from "@/lib/utils";
import { CatalogCard } from "@/components/CatalogCard";
import type { Car } from "@/payload-types";

interface Props {
  className?: string;
  cars: Car[];
}

/**
 *  CatalogGrid
 *  @param className
 *  @param cars
 */

export function CatalogGrid({ className = "", cars }: Props) {
  return (
    <div
      className={cn(
        "flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 p-4",
        "lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0",
        className,
      )}
    >
      {cars.map((car) => (
        <CatalogCard
          key={car.id}
          car={car}
          className="snap-center shrink-0 w-[85%] lg:w-auto"
        />
      ))}
    </div>
  );
}
