import { ReviewsPage } from "@/modules/ReviewsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return <ReviewsPage page={page} />;
}
