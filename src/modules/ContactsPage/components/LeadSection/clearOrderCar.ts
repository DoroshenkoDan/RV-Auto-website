"use server";

import { cookies } from "next/headers";

import { ORDER_CAR_COOKIE } from "@/lib/catalog/orderCar";

export async function clearOrderCar() {
  const cookieStore = await cookies();
  cookieStore.delete(ORDER_CAR_COOKIE);
}
