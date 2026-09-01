import { useTranslations } from "next-intl";
import { Button } from "@/ui/button";
import { Section, SectionTitle } from "@/ui/section";
import HowItWorksCard from "./components/HowItWorksCard";

export type Step = {
  title: string;
  description: string;
  icon: string;
};

const stepIcons = [
  { key: "selection", icon: "/images/HomePage/HowItWorks/Search.webp" },
  { key: "auction", icon: "/images/HomePage/HowItWorks/Bidding.webp" },
  { key: "delivery", icon: "/images/HomePage/HowItWorks/Delivery.webp" },
] as const;

// TODO: add func to btn to open form modal
export default function HowItWorks() {
  const t = useTranslations("homePage.howItWorks");

  return (
    <Section tone="dark">
      <SectionTitle>{t("title")}</SectionTitle>

      <div className="grid grid-cols-1 gap-stack sm:grid-cols-2 lg:grid-cols-3">
        {stepIcons.map(({ key, icon }, index) => (
          <HowItWorksCard
            key={key}
            index={index}
            step={{
              title: t(`steps.${key}.title`),
              description: t(`steps.${key}.description`),
              icon,
            }}
          />
        ))}
      </div>

      <div className="mt-section-title flex flex-col items-center gap-stack lg:flex-row">
        <span className="font-bold">{t("ctaLabel")}</span>
        <Button type="button" className="w-full lg:w-fit">
          {t("cta")}
        </Button>
      </div>
    </Section>
  );
}
