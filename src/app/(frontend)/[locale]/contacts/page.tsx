import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { parseCalculatorParams } from "@/lib/calculator/params";
import { ORDER_CAR_COOKIE, resolveOrderCarSlug } from "@/lib/catalog/orderCar";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ContactsPage } from "@/modules/ContactsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage.meta" });

  return buildPageMetadata({
    locale,
    path: "/contacts",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const initialInput = parseCalculatorParams(params);

  const carSlug = resolveOrderCarSlug({
    carParam: typeof params.car === "string" ? params.car : undefined,
    storedSlug: cookieStore.get(ORDER_CAR_COOKIE)?.value,
    hasCalculation: initialInput !== null,
  });

  return <ContactsPage initialInput={initialInput} carSlug={carSlug} />;
}
