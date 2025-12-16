import { describe, test, expect } from "vitest";
import { validateTH } from "../../src/validators/asia/th";

describe("validateTH - Thai phone numbers", () => {
  test("should accept valid Thai mobile numbers", () => {
    expect(validateTH("081 234 5678").isValid).toBe(true);
    expect(validateTH("092 234 5678").isValid).toBe(true);
    expect(validateTH("064 234 5678").isValid).toBe(true);
  });

  test("should accept Thai landline numbers", () => {
    expect(validateTH("02 123 4567").isValid).toBe(true); // Bangkok
    expect(validateTH("053 123 456").isValid).toBe(true); // Chiang Mai
    expect(validateTH("076 123 456").isValid).toBe(true); // Phuket
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTH("081 234 5678").isValid).toBe(true);
    expect(validateTH("081-234-5678").isValid).toBe(true);
    expect(validateTH("02 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+66)", () => {
    expect(validateTH("+66 81 234 5678").isValid).toBe(true);
    expect(validateTH("+66 2 123 4567").isValid).toBe(true);
    expect(validateTH("66 81 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTH("081 234 567").isValid).toBe(false);
    expect(validateTH("081 234 56789").isValid).toBe(false);
    expect(validateTH("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTH("001 234 5678").isValid).toBe(false);
    expect(validateTH("011 234 5678").isValid).toBe(false);
  });
});





