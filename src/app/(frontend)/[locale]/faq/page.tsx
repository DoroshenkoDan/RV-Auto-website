import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getExchangeRates } from "@/lib/calculator/nbu";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FaqPage } from "@/modules/FaqPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/faq",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page() {
  const rates = await getExchangeRates();

  return <FaqPage rates={rates} />;
}
