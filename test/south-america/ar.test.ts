import { describe, test, expect } from "vitest";
import { validateAR } from "../../src/validators/south-america/ar";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateAR - Argentinian phone numbers", () => {
  test("should accept valid Argentinian mobile numbers", () => {
    expect(validateAR("9 11 1234 567").isValid).toBe(true); // Buenos Aires mobile
    expect(validateAR("9 22 1234 567").isValid).toBe(true); // La Plata mobile
    expect(validateAR("9 34 1234 567").isValid).toBe(true); // Rosario mobile
    expect(validateAR("9111234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Argentinian landline numbers", () => {
    expect(validateAR("11 1234 5678").isValid).toBe(true); // Buenos Aires landline
    expect(validateAR("22 123 4567").isValid).toBe(true); // La Plata landline (8 digits)
    expect(validateAR("34 123 4567").isValid).toBe(true); // Rosario landline (8 digits)
    expect(validateAR("1112345678").isValid).toBe(true); // Without formatting (10 digits)
    expect(validateAR("22123456").isValid).toBe(true); // Without formatting (8 digits)
  });

  test("should accept phone numbers with country code", () => {
    expect(validateAR("54 9 11 1234 567").isValid).toBe(true);
    expect(validateAR("+54 11 1234 567").isValid).toBe(true);
    expect(validateAR("0054 9 22 1234 567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAR("9-11-1234-567").isValid).toBe(true);
    expect(validateAR("(11) 1234-567").isValid).toBe(true);
    expect(validateAR("9.22.1234.567").isValid).toBe(true);
    expect(validateAR("34 123 4567").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 10 digits", () => {
    const result1 = validateAR("9 11 123 456"); // 9 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateAR("9 11 1234 5678"); // 11 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject landline numbers starting with 0 or 9", () => {
    const result1 = validateAR("01 1234 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateAR("9 01 234 5678"); // Starts with 9 but area code 01 is invalid (< 11)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateAR("1234567"); // 7 digits - too short
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateAR("123456"); // 6 digits - too short
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateAR("9 11 1234 567890"); // 12 digits - too long
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateAR("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateAR("9 11 abc 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateAR("11#1234#5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept valid area codes for mobile", () => {
    expect(validateAR("9 11 1234 567").isValid).toBe(true); // Buenos Aires
    expect(validateAR("9 22 1234 567").isValid).toBe(true); // La Plata area
    expect(validateAR("9 26 1234 567").isValid).toBe(true); // Mendoza area
    expect(validateAR("9 34 1234 567").isValid).toBe(true); // Rosario area
    expect(validateAR("9 35 1234 567").isValid).toBe(true); // Córdoba area
  });

  test("should accept valid landline formats", () => {
    expect(validateAR("11234567").isValid).toBe(true); // 8 digits
    expect(validateAR("112345678").isValid).toBe(true); // 9 digits
    expect(validateAR("1123456789").isValid).toBe(true); // 10 digits
    expect(validateAR("22123456").isValid).toBe(true); // 8 digits
    expect(validateAR("341234567").isValid).toBe(true); // 9 digits
  });
});
