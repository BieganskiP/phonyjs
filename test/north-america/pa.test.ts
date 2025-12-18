import { describe, test, expect } from "vitest";
import { validatePA } from "../../src/validators/north-america/pa";
import { ErrorCodes } from "../../src/errorCodes";

describe("validatePA - Panamanian phone numbers", () => {
  test("should accept valid Panamanian mobile numbers", () => {
    expect(validatePA("6123 4567").isValid).toBe(true); // Mobile (8 digits)
    expect(validatePA("6234 5678").isValid).toBe(true); // Mobile
    expect(validatePA("61234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Panamanian landline numbers", () => {
    expect(validatePA("223 45678").isValid).toBe(true); // Panama City (8 digits)
    expect(validatePA("234 56789").isValid).toBe(true); // Panama City
    expect(validatePA("412 3456").isValid).toBe(true); // Regional (7 digits)
    expect(validatePA("723 4567").isValid).toBe(true); // Regional (7 digits)
    expect(validatePA("912 3456").isValid).toBe(true); // Regional (7 digits)
    expect(validatePA("22345678").isValid).toBe(true); // Panama City without formatting
    expect(validatePA("4123456").isValid).toBe(true); // Regional without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validatePA("507 6123 4567").isValid).toBe(true);
    expect(validatePA("+507 223 45678").isValid).toBe(true);
    expect(validatePA("00507 412 3456").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 8 digits", () => {
    const result1 = validatePA("612 3456"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validatePA("6123 45678"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject Panama City landlines not exactly 8 digits", () => {
    const result1 = validatePA("223 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePA("223 456789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject regional landlines not exactly 7 digits", () => {
    const result1 = validatePA("412 345678"); // 8 digits for regional
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validatePA("412 345"); // 6 digits for regional
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validatePA("123 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validatePA("512 3456");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should accept all valid prefixes", () => {
    expect(validatePA("22345678").isValid).toBe(true); // Panama City landline
    expect(validatePA("4123456").isValid).toBe(true); // Regional landline
    expect(validatePA("61234567").isValid).toBe(true); // Mobile
    expect(validatePA("7123456").isValid).toBe(true); // Regional landline
    expect(validatePA("9123456").isValid).toBe(true); // Regional landline
  });
});
