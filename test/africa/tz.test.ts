import { describe, test, expect } from "vitest";
import { validateTZ } from "../../src/validators/africa/tz";

describe("validateTZ - Tanzania phone numbers", () => {
  test("should accept valid Tanzania phone numbers", () => {
    expect(validateTZ("71 123 4567").isValid).toBe(true);
    expect(validateTZ("22 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+255)", () => {
    expect(validateTZ("+255 71 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateTZ("11 123 4567").isValid).toBe(false);
    expect(validateTZ("").isValid).toBe(false);
  });
});

