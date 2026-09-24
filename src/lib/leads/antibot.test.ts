import { describe, expect, it } from "vitest";

import { RENDERED_TOKEN } from "./constants";
import { checkAntibot } from "./antibot";

function check(overrides: Partial<Parameters<typeof checkAntibot>[0]> = {}) {
  return checkAntibot({
    honeypot: "",
    rendered: RENDERED_TOKEN,
    ...overrides,
  });
}

describe("checkAntibot", () => {
  it("accepts a submission that came through the form", () => {
    expect(check()).toBe("ok");
  });

  it("accepts an absent honeypot field", () => {
    expect(check({ honeypot: undefined })).toBe("ok");
  });

  it("rejects a filled honeypot", () => {
    expect(check({ honeypot: "Acme Inc" })).toBe("bot");
  });

  it("rejects a honeypot filled with whitespace only", () => {
    expect(check({ honeypot: "   " })).toBe("bot");
  });

  it("rejects a non-string honeypot value", () => {
    expect(check({ honeypot: 1 })).toBe("bot");
  });

  it("rejects a payload posted without the rendered marker", () => {
    expect(check({ rendered: undefined })).toBe("bot");
  });

  it("rejects a wrong rendered marker", () => {
    expect(check({ rendered: "nope" })).toBe("bot");
  });

  it("rejects a null rendered marker", () => {
    expect(check({ rendered: null })).toBe("bot");
  });

  it("never reports a timing verdict", () => {
    expect(["ok", "bot"]).toContain(check());
    expect(["ok", "bot"]).toContain(check({ rendered: undefined }));
  });
});
