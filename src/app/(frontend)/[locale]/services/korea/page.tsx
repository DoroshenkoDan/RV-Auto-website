import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { ImportServicePage } from "@/modules/ImportServicePage";
import { getServiceMetadata } from "@/modules/ServicesShared/getServiceMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return getServiceMetadata(locale, "korea");
}

export default function Page() {
  return <ImportServicePage country="korea" />;
}
