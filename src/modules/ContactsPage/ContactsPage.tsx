import { getLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { CalculatorInput } from "@/lib/calculator/types";
import { getCarBySlug } from "@/lib/payload/cars";
import type { Car } from "@/payload-types";
import { Section } from "@/ui/section";

import { LeadSection } from "./components/LeadSection";
import type { LeadCar } from "./components/LeadSection/types";

function toLeadCar(car: Car): LeadCar {
  const photo = car.gallery.find(
    (image) => typeof image === "object" && Boolean(image.url),
  );

  return {
    slug: car.slug,
    title: car.title,
    year: car.year,
    mileageKm: car.mileageKm,
    engine: car.engine,
    drivetrain: car.drivetrain,
    transmission: car.transmission,
    photo:
      typeof photo === "object" && photo.url
        ? { url: photo.url, alt: photo.alt ?? car.title }
        : null,
  };
}

export async function ContactsPage({
  initialInput,
  carSlug,
}: {
  initialInput: CalculatorInput | null;
  carSlug: string | null;
}) {
  const locale = (await getLocale()) as Locale;
  const car = carSlug ? await getCarBySlug(carSlug, locale) : null;

  return (
    <Section>
      <LeadSection
        initialInput={initialInput}
        selectedCar={car && toLeadCar(car)}
        hasStaleCar={carSlug !== null && car === null}
      />
    </Section>
  );
}
