import { describe, test, expect } from "vitest";
import { validateGeneric } from "../src/validators/generic";

describe("validateGeneric - Generic phone number validator", () => {
  test("should accept phone numbers within valid length range (7-15 digits)", () => {
    expect(validateGeneric("1234567")).toBe(true); // 7 digits
    expect(validateGeneric("12345678")).toBe(true); // 8 digits
    expect(validateGeneric("1234567890")).toBe(true); // 10 digits
    expect(validateGeneric("123456789012")).toBe(true); // 12 digits
    expect(validateGeneric("123456789012345")).toBe(true); // 15 digits
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGeneric("123 456 7890")).toBe(true);
    expect(validateGeneric("123-456-7890")).toBe(true);
    expect(validateGeneric("+1 (234) 567-8901")).toBe(true);
    expect(validateGeneric("+33 6 12 34 56 78")).toBe(true);
  });

  test("should reject phone numbers that are too short", () => {
    expect(validateGeneric("123456")).toBe(false); // 6 digits
    expect(validateGeneric("12345")).toBe(false); // 5 digits
    expect(validateGeneric("123")).toBe(false);
  });

  test("should reject phone numbers that are too long", () => {
    expect(validateGeneric("1234567890123456")).toBe(false); // 16 digits
    expect(validateGeneric("12345678901234567890")).toBe(false); // 20 digits
  });

  test("should reject all-zero phone numbers", () => {
    expect(validateGeneric("0000000")).toBe(false);
    expect(validateGeneric("0000000000")).toBe(false);
    expect(validateGeneric("000 000 0000")).toBe(false);
  });

  test("should accept phone numbers with at least one non-zero digit", () => {
    expect(validateGeneric("0000001")).toBe(true);
    expect(validateGeneric("1000000")).toBe(true);
    expect(validateGeneric("0001000")).toBe(true);
  });

  test("should reject empty strings", () => {
    expect(validateGeneric("")).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validateGeneric("abc def ghij")).toBe(false);
    expect(validateGeneric("----------")).toBe(false);
    expect(validateGeneric("   ")).toBe(false);
  });

  test("should accept various international formats", () => {
    // France
    expect(validateGeneric("+33 6 12 34 56 78")).toBe(true);
    // Germany
    expect(validateGeneric("+49 151 12345678")).toBe(true);
    // Japan
    expect(validateGeneric("+81 90 1234 5678")).toBe(true);
    // Australia
    expect(validateGeneric("+61 412 345 678")).toBe(true);
  });
});

