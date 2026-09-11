import { parseCalculatorParams } from "@/lib/calculator/params";
import { ContactsPage } from "@/modules/ContactsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return <ContactsPage initialInput={parseCalculatorParams(params)} />;
}
