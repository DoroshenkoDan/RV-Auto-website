import { useTranslations } from "next-intl";

import type { Car } from "@/payload-types";

export function CarFeatures({
  features,
  className = "",
}: {
  features: NonNullable<Car["features"]>;
  className?: string;
}) {
  const t = useTranslations("carPage.features");

  return (
    <section className={className}>
      <h2 className="mb-stack font-logo text-h3 font-bold">{t("title")}</h2>
      <ul className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <li
            key={feature.id}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-label"
          >
            {feature.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
