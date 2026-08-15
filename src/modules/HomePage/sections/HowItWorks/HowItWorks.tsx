import { Scale, Search, Truck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import HowItWorksCard from "./components/HowItWorksCard";

export type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

interface Props {
  className?: string;
}

const stepIcons = [
  { key: "selection", icon: Search },
  { key: "auction", icon: Scale },
  { key: "delivery", icon: Truck },
] as const;

// TODO: add func to btn to open form modal
export default function HowItWorks({ className = "" }: Props) {
  const t = useTranslations("homePage.howItWorks");

  return (
    <section className={cn("bg-night py-16 lg:py-20 2xl:py-24", className)}>
      <div className="page-shell">
        <h2 className="mb-8 font-logo text-2xl leading-tight font-bold text-sand lg:mb-10 lg:text-3xl 2xl:mb-12 2xl:text-4xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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

        <div className="mt-10 flex flex-col items-center gap-4 lg:mt-12 lg:flex-row">
          <span className="font-bold text-sand">{t("ctaLabel")}</span>
          <Button type="button" className="w-full lg:w-fit">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
