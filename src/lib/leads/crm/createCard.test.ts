import { afterEach, describe, expect, test, vi } from "vitest";

import type { Lead } from "../types";
import { buildCard } from "./buildCard";
import { RETRY_DELAY_MS } from "./config";
import { createCard } from "./createCard";

const lead: Lead = {
  name: "Олександр",
  phone: "+380671234567",
  messenger: "telegram",
  comment: "",
  source: "cta",
  calculation: null,
  carSlug: null,
};

const card = buildCard(lead);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("createCard", () => {
  test("posts the card to the pipeline cards endpoint", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 201 }));

    vi.stubEnv("KEYCRM_API_KEY", "test-key");
    vi.stubGlobal("fetch", fetchMock);

    await createCard(card);

    const [url, init] = fetchMock.mock.calls[0];

    expect(url).toBe("https://openapi.keycrm.app/v1/pipelines/cards");
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe("Bearer test-key");
    expect(JSON.parse(init.body)).toEqual(card);
  });

  test("throws when the api key is not configured", async () => {
    vi.stubEnv("KEYCRM_API_KEY", "");
    vi.stubGlobal("fetch", vi.fn());

    await expect(createCard(card)).rejects.toThrow(/KEYCRM_API_KEY/);
  });

  test("retries once when the rate limit is hit", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 429 }))
      .mockResolvedValueOnce(new Response(null, { status: 201 }));

    vi.stubEnv("KEYCRM_API_KEY", "test-key");
    vi.stubGlobal("fetch", fetchMock);
    vi.useFakeTimers();

    const pending = createCard(card);

    await vi.advanceTimersByTimeAsync(RETRY_DELAY_MS);
    await pending;

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("throws without retrying when the key is rejected", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("Unauthenticated.", { status: 401 }));

    vi.stubEnv("KEYCRM_API_KEY", "stale-key");
    vi.stubGlobal("fetch", fetchMock);

    await expect(createCard(card)).rejects.toThrow(/401/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
