import { beforeEach, describe, expect, it } from "vitest";

import {
  GLOBAL,
  PER_IP,
  checkRateLimit,
  recordLead,
  resetRateLimit,
} from "./rateLimit";

const now = 1_700_000_000_000;

beforeEach(() => {
  resetRateLimit();
});

describe("checkRateLimit", () => {
  it("allows submissions up to the per-ip limit", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      expect(checkRateLimit({ ip: "1.1.1.1", now }).allowed).toBe(true);
      recordLead({ ip: "1.1.1.1", now });
    }
  });

  it("blocks the submission after the per-ip limit", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "1.1.1.1", now });
    }

    expect(checkRateLimit({ ip: "1.1.1.1", now }).allowed).toBe(false);
  });

  it("counts separate addresses separately", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "1.1.1.1", now });
    }

    expect(checkRateLimit({ ip: "2.2.2.2", now }).allowed).toBe(true);
  });

  it("drops a timestamp that sits exactly on the window edge", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "1.1.1.1", now });
    }

    expect(
      checkRateLimit({ ip: "1.1.1.1", now: now + PER_IP.windowMs }).allowed,
    ).toBe(true);
  });

  it("still blocks one millisecond before the window edge", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "1.1.1.1", now });
    }

    expect(
      checkRateLimit({ ip: "1.1.1.1", now: now + PER_IP.windowMs - 1 }).allowed,
    ).toBe(false);
  });

  it("applies the global ceiling across many addresses", () => {
    for (let i = 0; i < GLOBAL.limit; i += 1) {
      recordLead({ ip: `10.0.0.${i}`, now });
    }

    expect(checkRateLimit({ ip: "10.9.9.9", now }).allowed).toBe(false);
  });

  it("releases the global ceiling once its window passes", () => {
    for (let i = 0; i < GLOBAL.limit; i += 1) {
      checkRateLimit({ ip: `10.0.0.${i}`, now });
    }

    expect(
      checkRateLimit({ ip: "10.9.9.9", now: now + GLOBAL.windowMs }).allowed,
    ).toBe(true);
  });

  it("does not record a hit for a blocked submission", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "1.1.1.1", now });
    }

    recordLead({ ip: "1.1.1.1", now });

    expect(
      checkRateLimit({ ip: "1.1.1.1", now: now + PER_IP.windowMs }).allowed,
    ).toBe(true);
  });
});

describe("checkRateLimit peek and record split", () => {
  it("does not consume quota when only peeking", () => {
    for (let i = 0; i < PER_IP.limit * 2; i += 1) {
      expect(checkRateLimit({ ip: "3.3.3.3", now }).allowed).toBe(true);
    }
  });

  it("consumes quota only once recorded", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "4.4.4.4", now });
    }

    expect(checkRateLimit({ ip: "4.4.4.4", now }).allowed).toBe(false);
  });

  it("skips the per-ip limit when the address is unknown", () => {
    for (let i = 0; i < PER_IP.limit * 3; i += 1) {
      recordLead({ ip: null, now });
    }

    expect(checkRateLimit({ ip: null, now }).allowed).toBe(true);
  });

  it("still applies the global ceiling when the address is unknown", () => {
    for (let i = 0; i < GLOBAL.limit; i += 1) {
      recordLead({ ip: null, now });
    }

    expect(checkRateLimit({ ip: null, now }).allowed).toBe(false);
  });

  it("keeps separate addresses independent when recording", () => {
    for (let i = 0; i < PER_IP.limit; i += 1) {
      recordLead({ ip: "5.5.5.5", now });
    }

    expect(checkRateLimit({ ip: "6.6.6.6", now }).allowed).toBe(true);
  });
});
