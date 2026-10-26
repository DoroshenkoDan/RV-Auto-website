import { FALLBACK_EXCHANGE_RATES } from "./rates";
import type { ExchangeRates } from "./types";

export const NBU_RATES_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

export const NBU_REVALIDATE_SECONDS = 3600;

const NBU_REQUEST_TIMEOUT_MS = 5000;

type NbuRate = { cc?: unknown; rate?: unknown };

function findRate(data: NbuRate[], code: string) {
  const rate = data.find((entry) => entry.cc === code)?.rate;

  return typeof rate === "number" && rate > 0 ? rate : null;
}

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(NBU_RATES_URL, {
      next: { revalidate: NBU_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(NBU_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return FALLBACK_EXCHANGE_RATES;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return FALLBACK_EXCHANGE_RATES;
    }

    const usd = findRate(data, "USD");
    const eur = findRate(data, "EUR");

    return usd && eur ? { usd, eur } : FALLBACK_EXCHANGE_RATES;
  } catch {
    return FALLBACK_EXCHANGE_RATES;
  }
}
