import { cookies } from "next/headers";

import { parseCalculatorParams } from "@/lib/calculator/params";
import { ORDER_CAR_COOKIE, resolveOrderCarSlug } from "@/lib/catalog/orderCar";
import { ContactsPage } from "@/modules/ContactsPage";

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
