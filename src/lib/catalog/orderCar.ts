export const ORDER_CAR_COOKIE = "rv-order-car";

export const ORDER_CAR_MAX_AGE = 3 * 24 * 60 * 60;

const SLUG_PATTERN = /^[A-Za-z0-9_-]+$/;
const MAX_SLUG_LENGTH = 200;

const CONTACTS_PATH_PATTERN = /^(?:\/[a-z]{2})?\/contacts\/?$/;

export function isOrderCarSlug(value: string | undefined): value is string {
  return (
    typeof value === "string" &&
    value.length <= MAX_SLUG_LENGTH &&
    SLUG_PATTERN.test(value)
  );
}

export function isContactsPath(pathname: string): boolean {
  return CONTACTS_PATH_PATTERN.test(pathname);
}

export function resolveOrderCarSlug({
  carParam,
  storedSlug,
  hasCalculation,
}: {
  carParam: string | undefined;
  storedSlug: string | undefined;
  hasCalculation: boolean;
}): string | null {
  if (hasCalculation) return null;
  if (isOrderCarSlug(carParam)) return carParam;
  if (isOrderCarSlug(storedSlug)) return storedSlug;
  return null;
}
