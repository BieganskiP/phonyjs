import { describe, test, expect } from "vitest";
import { validateKH } from "../../src/validators/asia/kh";

describe("validateKH - Cambodian phone numbers", () => {
  test("should accept valid Cambodian mobile numbers", () => {
    expect(validateKH("012 345 678").isValid).toBe(true);
    expect(validateKH("017 123 456").isValid).toBe(true);
    expect(validateKH("096 789 012").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateKH("012 345 678").isValid).toBe(true);
    expect(validateKH("012-345-678").isValid).toBe(true);
    expect(validateKH("+855 12 345 678").isValid).toBe(true);
    expect(validateKH("00855 12 345 678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKH("012 345 67").isValid).toBe(false); // too short
    expect(validateKH("012 345 6789").isValid).toBe(false); // too long
    expect(validateKH("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateKH("019 123 456").isValid).toBe(false);
    expect(validateKH("020 123 456").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateKH("012 345 67a").isValid).toBe(false);
    expect(validateKH("abc def ghi").isValid).toBe(false);
  });
});

