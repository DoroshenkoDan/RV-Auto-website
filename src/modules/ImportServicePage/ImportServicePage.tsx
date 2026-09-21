import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";
import { HeroStats } from "@/modules/ServicesShared/components/HeroStats";
import { ImportStages } from "@/modules/ServicesShared/sections/ImportStages";
import { ServiceFaq } from "@/modules/ServicesShared/sections/ServiceFaq";
import { ServiceFeatures } from "@/modules/ServicesShared/sections/ServiceFeatures";
import { ServiceHero } from "@/modules/ServicesShared/sections/ServiceHero";
import { ServicePlatforms } from "@/modules/ServicesShared/sections/ServicePlatforms";
import {
  IMPORT_COUNTRIES,
  IMPORT_COUNTRY_FACTS,
  type ImportCountry,
} from "@/modules/ServicesShared/servicesConfig";

export function ImportServicePage({ country }: { country: ImportCountry }) {
  const t = useTranslations(`services.${country}.cta`);
  const { platforms, transport, features, faq } = IMPORT_COUNTRIES[country];

  return (
    <>
      <ServiceHero service={country} secondaryAction="catalog">
        <HeroStats service={country} facts={IMPORT_COUNTRY_FACTS} />
      </ServiceHero>
      <ServicePlatforms platforms={platforms} />
      <ImportStages transport={transport} />
      <ServiceFeatures service={country} features={features} />
      <ServiceFaq service={country} questions={faq} />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
