import { describe, test, expect } from "vitest";
import { validateTM } from "../../src/validators/asia/tm";

describe("validateTM - Turkmenistan phone numbers", () => {
  test("should accept valid Turkmenistan mobile numbers", () => {
    expect(validateTM("61 123 456").isValid).toBe(true);
    expect(validateTM("62 123 456").isValid).toBe(true);
    expect(validateTM("63 123 456").isValid).toBe(true);
    expect(validateTM("64 123 456").isValid).toBe(true);
    expect(validateTM("65 123 456").isValid).toBe(true);
    expect(validateTM("66 123 456").isValid).toBe(true);
  });

  test("should accept Turkmenistan landline numbers", () => {
    expect(validateTM("12 345 678").isValid).toBe(true); // Ashgabat
    expect(validateTM("22 345 678").isValid).toBe(true); // Türkmenabat
    expect(validateTM("32 345 678").isValid).toBe(true); // Dashoguz
    expect(validateTM("42 345 678").isValid).toBe(true); // Mary
    expect(validateTM("52 345 678").isValid).toBe(true); // Balkanabat
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTM("61 123 456").isValid).toBe(true);
    expect(validateTM("61-123-456").isValid).toBe(true);
    expect(validateTM("12 345 678").isValid).toBe(true);
  });

  test("should accept international format (+993)", () => {
    expect(validateTM("+993 61 123 456").isValid).toBe(true);
    expect(validateTM("+993 12 345 678").isValid).toBe(true);
    expect(validateTM("993 61 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTM("61 123 45").isValid).toBe(false);
    expect(validateTM("61 123 4567").isValid).toBe(false);
    expect(validateTM("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTM("71 123 456").isValid).toBe(false);
    expect(validateTM("81 123 456").isValid).toBe(false);
    expect(validateTM("91 123 456").isValid).toBe(false);
    expect(validateTM("67 123 456").isValid).toBe(false); // 67 not valid
  });
});


