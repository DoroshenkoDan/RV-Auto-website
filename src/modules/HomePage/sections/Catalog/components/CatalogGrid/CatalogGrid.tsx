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
        "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto p-4",
        "lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible",
        className,
      )}
    >
      {cars.map((car) => (
        <CatalogCard
          key={car.id}
          car={car}
          className="w-[85%] shrink-0 snap-center lg:w-auto"
        />
      ))}
    </div>
  );
}
