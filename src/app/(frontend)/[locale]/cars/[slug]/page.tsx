import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getCarBySlug } from "@/lib/payload/cars";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatUsd } from "@/lib/utils";
import { CarPage } from "@/modules/CarPage";

const META_DESCRIPTION_MAX = 160;

function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const car = await getCarBySlug(slug, locale);

  if (!car) return {};

  const t = await getTranslations({ locale, namespace: "carPage.meta" });
  const photo = car.gallery.find(
    (image) => typeof image === "object" && Boolean(image.url),
  );

  return buildPageMetadata({
    locale,
    path: `/cars/${car.slug}`,
    title: t("title", { title: car.title }),
    description: car.description
      ? truncate(car.description, META_DESCRIPTION_MAX)
      : t("description", {
          title: car.title,
          year: car.year,
          price: formatUsd(car.price),
        }),
    image:
      typeof photo === "object" && photo.url
        ? {
            url: photo.url,
            width: photo.width ?? undefined,
            height: photo.height ?? undefined,
            alt: photo.alt ?? car.title,
          }
        : undefined,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CarPage slug={slug} />;
}
