import { describe, test, expect } from "vitest";
import { validateKP } from "../../src/validators/asia/kp";

describe("validateKP - North Korean phone numbers", () => {
  test("should accept valid North Korean mobile numbers", () => {
    expect(validateKP("191 234 5678").isValid).toBe(true); // 10 digits mobile
    expect(validateKP("192 234 5678").isValid).toBe(true);
    expect(validateKP("195 234 5678").isValid).toBe(true);
    expect(validateKP("1912345678").isValid).toBe(true); // no formatting
  });

  test("should accept North Korean landline numbers", () => {
    expect(validateKP("2 1234 5678").isValid).toBe(true); // Pyongyang (8 digits)
    expect(validateKP("21234567").isValid).toBe(true); // no formatting
    expect(validateKP("31234567").isValid).toBe(true); // other region
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKP("191 234 5678").isValid).toBe(true);
    expect(validateKP("191-234-5678").isValid).toBe(true);
    expect(validateKP("2-1234-5678").isValid).toBe(true);
  });

  test("should accept international format (+850)", () => {
    expect(validateKP("+850 191 234 5678").isValid).toBe(true);
    expect(validateKP("+850 2 1234 5678").isValid).toBe(true);
    expect(validateKP("850 191 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKP("191 234 567").isValid).toBe(false); // too short
    expect(validateKP("191 234 56789").isValid).toBe(false); // too long
    expect(validateKP("2 123 456").isValid).toBe(false); // too short
    expect(validateKP("").isValid).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateKP("193 234 5678").isValid).toBe(false); // 193 not valid
    expect(validateKP("194 234 5678").isValid).toBe(false); // 194 not valid
    expect(validateKP("190 234 5678").isValid).toBe(false); // 190 not valid
  });

  test("should reject 9-digit numbers", () => {
    expect(validateKP("123456789").isValid).toBe(false); // not valid length
  });
});

