import { describe, test, expect } from "vitest";
import { validateBD } from "../../src/validators/asia-pacific/bd";

describe("validateBD - Bangladeshi phone numbers", () => {
  test("should accept valid Bangladeshi mobile numbers", () => {
    expect(validateBD("01712 345678").isValid).toBe(true);
    expect(validateBD("01812 345678").isValid).toBe(true);
    expect(validateBD("01912 345678").isValid).toBe(true);
  });

  test("should accept valid Bangladeshi landline numbers", () => {
    expect(validateBD("02 1234 5678").isValid).toBe(true);
    expect(validateBD("031 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateBD("01712 345678").isValid).toBe(true);
    expect(validateBD("017-1234-5678").isValid).toBe(true);
    expect(validateBD("+880 1712 345678").isValid).toBe(true);
    expect(validateBD("00880 1712 345678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBD("01712 34567").isValid).toBe(false); // too short
    expect(validateBD("01712 3456789").isValid).toBe(false); // too long
    expect(validateBD("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateBD("01012 345678").isValid).toBe(false);
    expect(validateBD("01212 345678").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateBD("01712 34567a").isValid).toBe(false);
    expect(validateBD("abc def ghi").isValid).toBe(false);
  });
});

