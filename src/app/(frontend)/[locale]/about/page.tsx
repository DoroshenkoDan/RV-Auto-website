import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { AboutPage } from "@/modules/AboutPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default function Page() {
  return <AboutPage />;
}
