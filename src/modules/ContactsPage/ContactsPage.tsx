import { getLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { CalculatorInput } from "@/lib/calculator/types";
import { getCarBySlug } from "@/lib/payload/cars";
import { Section } from "@/ui/section";

import { LeadSection } from "./components/LeadSection";

export async function ContactsPage({
  initialInput,
  carSlug,
}: {
  initialInput: CalculatorInput | null;
  carSlug?: string;
}) {
  const locale = (await getLocale()) as Locale;
  const car = carSlug ? await getCarBySlug(carSlug, locale) : null;

  return (
    <Section>
      <LeadSection
        initialInput={initialInput}
        selectedCar={car && { slug: car.slug, title: car.title }}
      />
    </Section>
  );
}
