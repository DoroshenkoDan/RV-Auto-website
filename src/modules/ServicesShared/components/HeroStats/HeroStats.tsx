import { useTranslations } from "next-intl";

import type { ServiceKey } from "../../servicesConfig";

export function HeroStats({
  service,
  facts,
}: {
  service: ServiceKey;
  facts: readonly string[];
}) {
  const t = useTranslations(`services.${service}.hero.facts`);

  return (
    <ul className="grid gap-stack sm:grid-cols-3">
      {facts.map((fact) => (
        <li key={fact}>
          <p className="font-logo text-stat leading-none font-bold text-brand">
            {t(`${fact}.title`)}
          </p>
          <p className="mt-2 text-label text-sand/60">
            {t(`${fact}.description`)}
          </p>
        </li>
      ))}
    </ul>
  );
}
