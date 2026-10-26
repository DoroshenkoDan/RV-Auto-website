import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getExchangeRates } from "@/lib/calculator/nbu";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HomePage } from "@/modules/HomePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage.meta" });

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page() {
  const rates = await getExchangeRates();

  return <HomePage rates={rates} />;
}
