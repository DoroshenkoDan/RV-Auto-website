import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import {
  ORDER_CAR_COOKIE,
  ORDER_CAR_MAX_AGE,
  isContactsPath,
  isOrderCarSlug,
} from "@/lib/catalog/orderCar";

const intlProxy = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlProxy(request);
  const car = request.nextUrl.searchParams.get("car") ?? undefined;

  if (isContactsPath(request.nextUrl.pathname) && isOrderCarSlug(car)) {
    response.cookies.set(ORDER_CAR_COOKIE, car, {
      maxAge: ORDER_CAR_MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
