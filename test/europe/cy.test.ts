import { describe, test, expect } from "vitest";
import { validateCY } from "../../src/validators/europe/cy";

describe("validateCY - Cyprus phone numbers", () => {
  test("should accept valid Cyprus mobile numbers", () => {
    expect(validateCY("96 123 456").isValid).toBe(true);
    expect(validateCY("97 123 456").isValid).toBe(true);
    expect(validateCY("99 123 456").isValid).toBe(true);
  });

  test("should accept Cyprus landline numbers", () => {
    expect(validateCY("22 123 456").isValid).toBe(true);
    expect(validateCY("23 123 456").isValid).toBe(true);
    expect(validateCY("25 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCY("96 123 456").isValid).toBe(true);
    expect(validateCY("96-123-456").isValid).toBe(true);
    expect(validateCY("22 123 456").isValid).toBe(true);
  });

  test("should accept international format (+357)", () => {
    expect(validateCY("+357 96 123 456").isValid).toBe(true);
    expect(validateCY("+357 22 123 456").isValid).toBe(true);
    expect(validateCY("357 96 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCY("96 123 45").isValid).toBe(false);
    expect(validateCY("96 123 4567").isValid).toBe(false);
    expect(validateCY("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateCY("06 123 456").isValid).toBe(false);
    expect(validateCY("92 123 456").isValid).toBe(false);
  });
});





