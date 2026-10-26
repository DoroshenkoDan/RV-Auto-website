import { afterEach, describe, expect, test, vi } from "vitest";

import { NBU_RATES_URL, NBU_REVALIDATE_SECONDS, getExchangeRates } from "./nbu";
import { FALLBACK_EXCHANGE_RATES } from "./rates";

const nbuResponse = [
  { r030: 840, txt: "Долар США", rate: 45.5382, cc: "USD" },
  { r030: 978, txt: "Євро", rate: 50.9527, cc: "EUR" },
  { r030: 985, txt: "Злотий", rate: 11.9123, cc: "PLN" },
];

function respondWith(body: unknown, status = 200) {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(new Response(JSON.stringify(body), { status }));

  vi.stubGlobal("fetch", fetchMock);

  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getExchangeRates", () => {
  test("returns the usd and eur rates from the nbu response", async () => {
    respondWith(nbuResponse);

    await expect(getExchangeRates()).resolves.toEqual({
      usd: 45.5382,
      eur: 50.9527,
    });
  });

  test("requests the nbu endpoint with hourly revalidation", async () => {
    const fetchMock = respondWith(nbuResponse);

    await getExchangeRates();

    const [url, init] = fetchMock.mock.calls[0];

    expect(url).toBe(NBU_RATES_URL);
    expect(init.next.revalidate).toBe(NBU_REVALIDATE_SECONDS);
  });

  test("falls back when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(getExchangeRates()).resolves.toEqual(FALLBACK_EXCHANGE_RATES);
  });

  test("falls back when nbu responds with an error status", async () => {
    respondWith({ message: "unavailable" }, 503);

    await expect(getExchangeRates()).resolves.toEqual(FALLBACK_EXCHANGE_RATES);
  });

  test("falls back when the euro rate is missing", async () => {
    respondWith(nbuResponse.filter(({ cc }) => cc !== "EUR"));

    await expect(getExchangeRates()).resolves.toEqual(FALLBACK_EXCHANGE_RATES);
  });

  test("falls back when a rate is not a positive number", async () => {
    respondWith(
      nbuResponse.map((entry) =>
        entry.cc === "USD" ? { ...entry, rate: 0 } : entry,
      ),
    );

    await expect(getExchangeRates()).resolves.toEqual(FALLBACK_EXCHANGE_RATES);
  });
});
