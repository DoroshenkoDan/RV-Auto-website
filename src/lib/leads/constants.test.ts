import { describe, expect, it } from "vitest";

import { PHONE_PATTERN, PHONE_RAW_MAX, normalizePhone } from "./constants";

describe("normalizePhone", () => {
  it("strips spaces, brackets and dashes", () => {
    expect(normalizePhone("+38 (067) 123-45-67")).toBe("+380671234567");
  });

  it("leaves an already clean number untouched", () => {
    expect(normalizePhone("+380671234567")).toBe("+380671234567");
  });

  it("keeps a formatted number within the raw length limit", () => {
    expect("+38 (067) 123-45-67".length).toBeLessThanOrEqual(PHONE_RAW_MAX);
  });

  it("produces a value the phone pattern accepts", () => {
    expect(PHONE_PATTERN.test(normalizePhone("+38 (067) 123-45-67"))).toBe(
      true,
    );
  });
});
