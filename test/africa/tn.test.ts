import { describe, test, expect } from "vitest";
import { validateTN } from "../../src/validators/africa/tn";

describe("validateTN - Tunisian phone numbers", () => {
  test("should accept valid Tunisian mobile numbers", () => {
    expect(validateTN("20 123 456").isValid).toBe(true);
    expect(validateTN("40 123 456").isValid).toBe(true);
    expect(validateTN("50 123 456").isValid).toBe(true);
    expect(validateTN("90 123 456").isValid).toBe(true);
  });

  test("should accept Tunisian landline numbers", () => {
    expect(validateTN("71 123 456").isValid).toBe(true); // Tunis
    expect(validateTN("73 123 456").isValid).toBe(true); // Sousse
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTN("20 123 456").isValid).toBe(true);
    expect(validateTN("20-123-456").isValid).toBe(true);
  });

  test("should accept international format (+216)", () => {
    expect(validateTN("+216 20 123 456").isValid).toBe(true);
    expect(validateTN("216 71 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTN("20 123 45").isValid).toBe(false);
    expect(validateTN("20 123 4567").isValid).toBe(false);
    expect(validateTN("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTN("10 123 456").isValid).toBe(false);
    expect(validateTN("80 123 456").isValid).toBe(false);
  });
});

