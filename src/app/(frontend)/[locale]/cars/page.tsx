import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { CatalogPage } from "@/modules/CatalogPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalogPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/cars",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sort?: string; page?: string }>;
}) {
  const { status, sort, page } = await searchParams;

  return <CatalogPage status={status} sort={sort} page={page} />;
}
