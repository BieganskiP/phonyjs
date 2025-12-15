import { describe, test, expect } from "vitest";
import { validateSI } from "../../src/validators/europe/si";

describe("validateSI - Slovenian phone numbers", () => {
  test("should accept valid Slovenian phone numbers", () => {
    expect(validateSI("01 234 5678").isValid).toBe(true);
    expect(validateSI("031 234 567").isValid).toBe(true);
    expect(validateSI("040 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSI("01 234 5678").isValid).toBe(true);
    expect(validateSI("01-234-5678").isValid).toBe(true);
    expect(validateSI("+386 1 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSI("01 234 567").isValid).toBe(false); // too short
    expect(validateSI("01 234 56789").isValid).toBe(false); // too long
    expect(validateSI("123").isValid).toBe(false);
    expect(validateSI("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateSI("123456789").isValid).toBe(false);
  });
});

