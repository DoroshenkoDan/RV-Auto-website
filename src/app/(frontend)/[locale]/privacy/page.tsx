import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PrivacyPage } from "@/modules/PrivacyPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <PrivacyPage />;
}
