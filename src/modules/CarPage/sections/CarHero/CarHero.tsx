import type { Car } from "@/payload-types";

import { CarDescription } from "./components/CarDescription";
import { CarFeatures } from "./components/CarFeatures";
import { CarGallery } from "./components/CarGallery";
import { CarSummary } from "./components/CarSummary";

export function CarHero({ car }: { car: Car }) {
  const hasFeatures = Boolean(car.features?.length);
  const hasDetails = Boolean(car.description) || hasFeatures;

  return (
    <section className="bg-canvas pt-block pb-section text-ink max-sm:pt-0">
      <div className="page-shell grid grid-cols-[minmax(0,1fr)] gap-block lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-[auto_1fr]">
        <CarGallery
          gallery={car.gallery}
          alt={car.title}
          className="lg:col-start-1 lg:row-start-1"
        />

        <CarSummary
          car={car}
          className="lg:sticky lg:top-[calc(var(--header-h)+var(--spacing-block))] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-[calc(100dvh-var(--header-h)-2*var(--spacing-block))] lg:self-start lg:overflow-y-auto"
        />

        {hasDetails && (
          <div className="flex flex-col gap-section-title lg:col-start-1 lg:row-start-2">
            {car.description && (
              <CarDescription description={car.description} />
            )}
            {hasFeatures && <CarFeatures features={car.features ?? []} />}
          </div>
        )}
      </div>
    </section>
  );
}
