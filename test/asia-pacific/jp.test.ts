import { describe, test, expect } from "vitest";
import { validateJP } from "../../src/validators/asia-pacific/jp";

describe("validateJP - Japanese phone numbers", () => {
  test("should accept valid Japanese mobile numbers", () => {
    expect(validateJP("09012345678").isValid).toBe(true);
    expect(validateJP("08012345678").isValid).toBe(true);
    expect(validateJP("07012345678").isValid).toBe(true);
  });

  test("should accept Japanese landline numbers", () => {
    expect(validateJP("0312345678").isValid).toBe(true); // Tokyo
    expect(validateJP("0612345678").isValid).toBe(true); // Osaka
    expect(validateJP("0451234567").isValid).toBe(true); // Yokohama
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateJP("090 1234 5678").isValid).toBe(true);
    expect(validateJP("090-1234-5678").isValid).toBe(true);
    expect(validateJP("03 1234 5678").isValid).toBe(true);
  });

  test("should accept international format (+81)", () => {
    expect(validateJP("+81 90 1234 5678").isValid).toBe(true); // mobile
    expect(validateJP("+81 3 1234 5678").isValid).toBe(true); // landline Tokyo
    expect(validateJP("81 90 1234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateJP("090123456").isValid).toBe(false); // too short
    expect(validateJP("0901234567890").isValid).toBe(false); // too long
    expect(validateJP("090").isValid).toBe(false);
    expect(validateJP("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateJP("0012345678").isValid).toBe(false);
    expect(validateJP("1012345678").isValid).toBe(false);
  });
});





