import { useLocale, useTranslations } from "next-intl";

import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";
import { NAV_SERVICES } from "@/layout/MainLayout/navItems";
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { pageUrl } from "@/lib/seo/metadata";

import type { ServiceKey } from "../../servicesConfig";

export function ServiceBreadcrumbs({ service }: { service: ServiceKey }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const path = `/services/${service}`;
  const navKey = NAV_SERVICES.children.find(({ href }) => href === path)?.key;

  if (!navKey) return null;

  return (
    <JsonLd
      data={buildBreadcrumbJsonLd([
        { name: t("home"), url: pageUrl(locale, "/") },
        { name: t(navKey), url: pageUrl(locale, path) },
      ])}
    />
  );
}
