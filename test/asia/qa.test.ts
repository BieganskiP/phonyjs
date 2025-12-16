import { describe, test, expect } from "vitest";
import { validateQA } from "../../src/validators/asia/qa";

describe("validateQA - Qatari phone numbers", () => {
  test("should accept valid Qatari mobile numbers", () => {
    expect(validateQA("3123 4567").isValid).toBe(true); // Ooredoo
    expect(validateQA("5123 4567").isValid).toBe(true); // Vodafone
    expect(validateQA("6123 4567").isValid).toBe(true); // Vodafone
    expect(validateQA("7123 4567").isValid).toBe(true); // Vodafone
  });

  test("should accept Qatari landline numbers", () => {
    expect(validateQA("4123 4567").isValid).toBe(true);
    expect(validateQA("44123456").isValid).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateQA("3123 4567").isValid).toBe(true);
    expect(validateQA("3123-4567").isValid).toBe(true);
    expect(validateQA("4 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+974)", () => {
    expect(validateQA("+974 3123 4567").isValid).toBe(true); // mobile
    expect(validateQA("+974 4123 4567").isValid).toBe(true); // landline
    expect(validateQA("974 5123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateQA("3123 456").isValid).toBe(false); // too short
    expect(validateQA("3123 45678").isValid).toBe(false); // too long
    expect(validateQA("312").isValid).toBe(false);
    expect(validateQA("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateQA("2123 4567").isValid).toBe(false); // must start 3-7 (mobile) or 4 (landline)
    expect(validateQA("8123 4567").isValid).toBe(false);
  });
});





