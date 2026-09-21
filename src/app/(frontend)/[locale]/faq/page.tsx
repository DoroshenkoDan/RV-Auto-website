import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { FaqPage } from "@/modules/FaqPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <FaqPage />;
}
