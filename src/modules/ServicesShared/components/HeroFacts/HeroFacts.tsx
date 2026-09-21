import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { ServiceKey } from "../../servicesConfig";

export function HeroFacts({
  service,
  facts,
}: {
  service: ServiceKey;
  facts: readonly string[];
}) {
  const t = useTranslations(`services.${service}.hero.facts`);

  return (
    <ul
      className={cn(
        "grid gap-stack",
        facts.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
      )}
    >
      {facts.map((fact) => (
        <li key={fact}>
          <p className="text-lead font-semibold text-brand">
            {t(`${fact}.title`)}
          </p>
          <p className="mt-1 text-label text-sand/60">
            {t(`${fact}.description`)}
          </p>
        </li>
      ))}
    </ul>
  );
}
