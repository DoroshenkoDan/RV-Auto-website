import { useTranslations } from "next-intl";

import { sortCarFeatures, type CarFeature } from "@/lib/catalog/carFeatures";

export function CarFeatures({
  features,
  className = "",
}: {
  features: readonly CarFeature[];
  className?: string;
}) {
  const t = useTranslations("carPage.features");

  return (
    <section className={className}>
      <h2 className="mb-stack font-logo text-h3 font-bold">{t("title")}</h2>
      <ul className="flex flex-wrap gap-2">
        {sortCarFeatures(features).map((feature) => (
          <li
            key={feature}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-label"
          >
            {t(`items.${feature}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}
