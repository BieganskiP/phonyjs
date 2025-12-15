import { describe, test, expect } from "vitest";
import { validateIS } from "../../src/validators/europe/is";

describe("validateIS - Icelandic phone numbers", () => {
  test("should accept valid 7-digit Icelandic phone numbers", () => {
    expect(validateIS("512 3456").isValid).toBe(true);
    expect(validateIS("123 4567").isValid).toBe(true);
    expect(validateIS("1234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateIS("512 3456").isValid).toBe(true);
    expect(validateIS("512-3456").isValid).toBe(true);
    expect(validateIS("+354 512 3456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIS("123456").isValid).toBe(false); // too short
    expect(validateIS("12345678").isValid).toBe(false); // too long
    expect(validateIS("123").isValid).toBe(false);
    expect(validateIS("").isValid).toBe(false);
  });
});

