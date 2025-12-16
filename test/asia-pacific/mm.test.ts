import { describe, test, expect } from "vitest";
import { validateMM } from "../../src/validators/asia-pacific/mm";

describe("validateMM - Myanmar phone numbers", () => {
  test("should accept valid Myanmar mobile numbers", () => {
    expect(validateMM("09212 345678").isValid).toBe(true);
    expect(validateMM("09712 345678").isValid).toBe(true);
    expect(validateMM("09912 345678").isValid).toBe(true);
  });

  test("should accept valid Myanmar landline numbers", () => {
    expect(validateMM("01 123 4567").isValid).toBe(true);
    expect(validateMM("042 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMM("09212 345678").isValid).toBe(true);
    expect(validateMM("092-1234-5678").isValid).toBe(true);
    expect(validateMM("+95 9212 345678").isValid).toBe(true);
    expect(validateMM("0095 9212 345678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMM("09212 34567").isValid).toBe(false); // too short
    expect(validateMM("09212 3456789").isValid).toBe(false); // too long
    expect(validateMM("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateMM("09012 345678").isValid).toBe(false);
    expect(validateMM("09112 345678").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateMM("09212 34567a").isValid).toBe(false);
    expect(validateMM("abc def ghi").isValid).toBe(false);
  });
});

