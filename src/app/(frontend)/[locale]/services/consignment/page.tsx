import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { SellServicePage } from "@/modules/SellServicePage";
import { getServiceMetadata } from "@/modules/ServicesShared/getServiceMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return getServiceMetadata(locale, "consignment");
}

export default function Page() {
  return <SellServicePage service="consignment" />;
}
