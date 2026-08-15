import { useTranslations } from "next-intl";

import { CarSvg } from "@/components/CarSvg";

export function CalculatorIdle() {
  const t = useTranslations("homePage.calculator.idle");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-6 2xl:gap-y-8">
      <CarSvg className="w-full max-w-md 2xl:max-w-xl" />
      <p className="max-w-sm text-lg text-sand lg:text-xl 2xl:text-2xl">
        {t("label")}
      </p>
    </div>
  );
}
