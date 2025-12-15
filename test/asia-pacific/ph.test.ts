import { describe, test, expect } from "vitest";
import { validatePH } from "../../src/validators/asia-pacific/ph";

describe("validatePH - Philippine phone numbers", () => {
  test("should accept valid Philippine mobile numbers", () => {
    expect(validatePH("0917 123 4567").isValid).toBe(true);
    expect(validatePH("0905 123 4567").isValid).toBe(true);
    expect(validatePH("0999 123 4567").isValid).toBe(true);
  });

  test("should accept Philippine landline numbers", () => {
    expect(validatePH("02 1234 5678").isValid).toBe(true); // Metro Manila
    expect(validatePH("032 123 4567").isValid).toBe(true); // Cebu
    expect(validatePH("082 123 4567").isValid).toBe(true); // Davao
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePH("0917 123 4567").isValid).toBe(true);
    expect(validatePH("0917-123-4567").isValid).toBe(true);
    expect(validatePH("02 1234 5678").isValid).toBe(true);
  });

  test("should accept international format (+63)", () => {
    expect(validatePH("+63 917 123 4567").isValid).toBe(true);
    expect(validatePH("+63 2 1234 5678").isValid).toBe(true);
    expect(validatePH("63 917 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePH("0917 123 456").isValid).toBe(false);
    expect(validatePH("0917 123 45678").isValid).toBe(false);
    expect(validatePH("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validatePH("0117 123 4567").isValid).toBe(false);
    expect(validatePH("0017 123 4567").isValid).toBe(false);
  });
});





