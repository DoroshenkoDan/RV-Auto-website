import { CatalogPage } from "@/modules/CatalogPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page } = await searchParams;

  return <CatalogPage status={status} page={page} />;
}
