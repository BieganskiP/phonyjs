import { describe, test, expect } from "vitest";
import { validateGeneric } from "../src/validators/generic";

describe("validateGeneric - Generic phone number validator", () => {
  test("should accept phone numbers within valid length range (7-15 digits)", () => {
    expect(validateGeneric("1234567").isValid).toBe(true); // 7 digits
    expect(validateGeneric("12345678").isValid).toBe(true); // 8 digits
    expect(validateGeneric("1234567890").isValid).toBe(true); // 10 digits
    expect(validateGeneric("123456789012").isValid).toBe(true); // 12 digits
    expect(validateGeneric("123456789012345").isValid).toBe(true); // 15 digits
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGeneric("123 456 7890").isValid).toBe(true);
    expect(validateGeneric("123-456-7890").isValid).toBe(true);
    expect(validateGeneric("+1 (234) 567-8901").isValid).toBe(true);
    expect(validateGeneric("+33 6 12 34 56 78").isValid).toBe(true);
  });

  test("should reject phone numbers that are too short", () => {
    expect(validateGeneric("123456").isValid).toBe(false); // 6 digits
    expect(validateGeneric("12345").isValid).toBe(false); // 5 digits
    expect(validateGeneric("123").isValid).toBe(false);
  });

  test("should reject phone numbers that are too long", () => {
    expect(validateGeneric("1234567890123456").isValid).toBe(false); // 16 digits
    expect(validateGeneric("12345678901234567890").isValid).toBe(false); // 20 digits
  });

  test("should reject all-zero phone numbers", () => {
    expect(validateGeneric("0000000").isValid).toBe(false);
    expect(validateGeneric("0000000000").isValid).toBe(false);
    expect(validateGeneric("000 000 0000").isValid).toBe(false);
  });

  test("should accept phone numbers with at least one non-zero digit", () => {
    expect(validateGeneric("0000001").isValid).toBe(true);
    expect(validateGeneric("1000000").isValid).toBe(true);
    expect(validateGeneric("0001000").isValid).toBe(true);
  });

  test("should reject empty strings", () => {
    expect(validateGeneric("").isValid).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validateGeneric("abc def ghij").isValid).toBe(false);
    expect(validateGeneric("----------").isValid).toBe(false);
    expect(validateGeneric("   ").isValid).toBe(false);
  });

  test("should accept various international formats", () => {
    // France
    expect(validateGeneric("+33 6 12 34 56 78").isValid).toBe(true);
    // Germany
    expect(validateGeneric("+49 151 12345678").isValid).toBe(true);
    // Japan
    expect(validateGeneric("+81 90 1234 5678").isValid).toBe(true);
    // Australia
    expect(validateGeneric("+61 412 345 678").isValid).toBe(true);
  });
});





