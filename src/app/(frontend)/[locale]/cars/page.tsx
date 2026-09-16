import { CatalogPage } from "@/modules/CatalogPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sort?: string; page?: string }>;
}) {
  const { status, sort, page } = await searchParams;

  return <CatalogPage status={status} sort={sort} page={page} />;
}
