import { describe, test, expect } from "vitest";
import { validateBN } from "../../src/validators/asia-pacific/bn";

describe("validateBN - Brunei phone numbers", () => {
  test("should accept valid Brunei phone numbers", () => {
    expect(validateBN("123 4567").isValid).toBe(true);
    expect(validateBN("9876543").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateBN("123-4567").isValid).toBe(true);
    expect(validateBN("+673 123 4567").isValid).toBe(true);
    expect(validateBN("00673 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBN("123456").isValid).toBe(false); // too short
    expect(validateBN("12345678").isValid).toBe(false); // too long
    expect(validateBN("123").isValid).toBe(false);
    expect(validateBN("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateBN("123 456a").isValid).toBe(false);
    expect(validateBN("abc def g").isValid).toBe(false);
  });
});

