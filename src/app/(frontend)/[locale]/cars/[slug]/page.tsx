import { CarPage } from "@/modules/CarPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CarPage slug={slug} />;
}
