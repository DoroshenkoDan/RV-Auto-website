import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ReviewsPage } from "@/modules/ReviewsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/reviews",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return <ReviewsPage page={page} />;
}
