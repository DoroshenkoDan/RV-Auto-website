import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundScreen } from "@/components/NotFoundScreen";
import { MainLayout } from "@/layout/MainLayout";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("errorPages");

  return {
    metadataBase: new URL(SITE_URL),
    title: `${t("eyebrowNotFound")} | ${SITE_NAME}`,
  };
}

export default async function GlobalNotFound() {
  const locale = await getLocale();

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <MainLayout>
            <NotFoundScreen />
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
