import { describe, test, expect } from "vitest";
import { validateTL } from "../../src/validators/asia/tl";

describe("validateTL - Timor-Leste phone numbers", () => {
  test("should accept valid Timor-Leste phone numbers", () => {
    expect(validateTL("123 4567").isValid).toBe(true);
    expect(validateTL("9876543").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateTL("123-4567").isValid).toBe(true);
    expect(validateTL("+670 123 4567").isValid).toBe(true);
    expect(validateTL("00670 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTL("123456").isValid).toBe(false); // too short
    expect(validateTL("12345678").isValid).toBe(false); // too long
    expect(validateTL("123").isValid).toBe(false);
    expect(validateTL("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateTL("123 456a").isValid).toBe(false);
    expect(validateTL("abc def g").isValid).toBe(false);
  });
});

