import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getCarBySlug } from "@/lib/payload/cars";
import { CarPhotoCarousel } from "@/components/CarPhotoCarousel";

export async function CarPage({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale;
  const car = await getCarBySlug(slug, locale);

  if (!car) {
    notFound();
  }

  return (
    <div>
      <h1>{car.title}</h1>
      <CarPhotoCarousel gallery={car.gallery} alt={car.title} imageWidth={600} imageHeight={400} />
      {car.description && <p>{car.description}</p>}
      {car.vin && <p>VIN: {car.vin}</p>}
      <ul>
        <li>{car.year}</li>
        <li>{car.mileageKm} km</li>
        <li>{car.engine}</li>
        <li>{car.drivetrain}</li>
        <li>{car.transmission}</li>
      </ul>
      {car.features && car.features.length > 0 && (
        <ul>
          {car.features.map((feature) => (
            <li key={feature.id}>{feature.value}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
