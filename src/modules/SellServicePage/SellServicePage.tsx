import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";
import { HeroFacts } from "@/modules/ServicesShared/components/HeroFacts";
import { SellCompare } from "@/modules/ServicesShared/sections/SellCompare";
import { SellSteps } from "@/modules/ServicesShared/sections/SellSteps";
import { ServiceFaq } from "@/modules/ServicesShared/sections/ServiceFaq";
import { ServiceHero } from "@/modules/ServicesShared/sections/ServiceHero";
import {
  SELL_SERVICES,
  type SellService,
} from "@/modules/ServicesShared/servicesConfig";

export function SellServicePage({ service }: { service: SellService }) {
  const t = useTranslations(`services.${service}.cta`);
  const { facts, steps, faq } = SELL_SERVICES[service];

  return (
    <>
      <ServiceHero service={service} secondaryAction="compare">
        <HeroFacts service={service} facts={facts} />
      </ServiceHero>
      <SellSteps service={service} steps={steps} />
      <SellCompare current={service} />
      <ServiceFaq service={service} questions={faq} />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
