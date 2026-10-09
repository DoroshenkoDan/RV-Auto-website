import { afterEach, describe, expect, test, vi } from "vitest";

import { buildCard } from "./crm/buildCard";
import { deliver } from "./deliver";
import type { Lead } from "./types";

const lead: Lead = {
  name: "Олександр",
  phone: "+380671234567",
  messenger: "viber",
  comment: "Передзвоніть після 18:00",
  source: "callback",
  calculation: null,
  carSlug: null,
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("deliver", () => {
  test("sends the built card to KeyCRM", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 201 }));

    vi.stubEnv("KEYCRM_API_KEY", "test-key");
    vi.stubGlobal("fetch", fetchMock);

    await deliver(lead);

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(
      buildCard(lead),
    );
  });

  test("logs the reason and rethrows when KeyCRM rejects the card", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.stubEnv("KEYCRM_API_KEY", "stale-key");
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(new Response("Unauthenticated.", { status: 401 })),
    );

    await expect(deliver(lead)).rejects.toThrow();
    expect(error).toHaveBeenCalled();
  });
});
