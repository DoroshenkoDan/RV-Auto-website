import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

import type { ServiceKey } from "./servicesConfig";

export async function getServiceMetadata(
  locale: Locale,
  service: ServiceKey,
): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: `services.${service}.meta`,
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}
