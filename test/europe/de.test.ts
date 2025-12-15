import { describe, test, expect } from "vitest";
import { validateDE } from "../../src/validators/europe/de";

describe("validateDE - German phone numbers", () => {
  test("should accept valid German mobile numbers", () => {
    expect(validateDE("01511234567").isValid).toBe(true); // 11 digits
    expect(validateDE("01621234567").isValid).toBe(true); // 11 digits
    expect(validateDE("01701234567").isValid).toBe(true); // 11 digits
    expect(validateDE("01571234567").isValid).toBe(true); // 11 digits
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateDE("0151 1234567").isValid).toBe(true);
    expect(validateDE("0151-1234567").isValid).toBe(true);
    expect(validateDE("0151 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+49)", () => {
    expect(validateDE("+49 151 1234567").isValid).toBe(true);
    expect(validateDE("+49151123456 7").isValid).toBe(true);
    expect(validateDE("49 162 1234567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect prefix", () => {
    expect(validateDE("01412345678").isValid).toBe(false); // starts with 014
    expect(validateDE("01812345678").isValid).toBe(false); // starts with 018
    expect(validateDE("01912345678").isValid).toBe(false); // starts with 019
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateDE("015112345").isValid).toBe(false); // too short (9 digits)
    expect(validateDE("01511234567890").isValid).toBe(false); // too long (14 digits)
    expect(validateDE("0151").isValid).toBe(false);
    expect(validateDE("").isValid).toBe(false);
  });

  test("should handle phone numbers with letters (strips them)", () => {
    // Letters are stripped, so these become valid if the resulting digits are valid
    expect(validateDE("0151-abc-1234567").isValid).toBe(true); // becomes 01511234567
    expect(validateDE("a151123456").isValid).toBe(false); // becomes 151123456 (no leading 0)
  });
});





