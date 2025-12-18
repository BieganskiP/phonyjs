import { describe, test, expect } from "vitest";
import { validateCO } from "../../src/validators/south-america/co";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateCO - Colombian phone numbers", () => {
  test("should accept valid Colombian mobile numbers", () => {
    expect(validateCO("300 123 4567").isValid).toBe(true); // Mobile
    expect(validateCO("310 123 4567").isValid).toBe(true); // Mobile
    expect(validateCO("320 123 4567").isValid).toBe(true); // Mobile
    expect(validateCO("350 123 4567").isValid).toBe(true); // Mobile
    expect(validateCO("3001234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Colombian landline numbers", () => {
    expect(validateCO("1 234 5678").isValid).toBe(true); // Bogotá (8 digits)
    expect(validateCO("2 345 6789").isValid).toBe(true); // Cali (8 digits)
    expect(validateCO("4 456 7890").isValid).toBe(true); // Medellín (8 digits)
    expect(validateCO("1234567").isValid).toBe(true); // 7 digits
    expect(validateCO("12345678").isValid).toBe(true); // 8 digits
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCO("57 300 123 4567").isValid).toBe(true);
    expect(validateCO("+57 1 234 5678").isValid).toBe(true);
    expect(validateCO("0057 320 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCO("300-123-4567").isValid).toBe(true);
    expect(validateCO("(1) 234-5678").isValid).toBe(true);
    expect(validateCO("320.123.4567").isValid).toBe(true);
    expect(validateCO("4 456 7890").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 10 digits", () => {
    const result1 = validateCO("300 123 456"); // 9 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateCO("300 123 45678"); // 11 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject mobile numbers with invalid prefix", () => {
    const result1 = validateCO("200 123 4567"); // Invalid - too long for landline
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateCO("400 123 4567"); // Invalid - starts with 4 but not mobile, treated as landline but too long
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject landline numbers with invalid area codes", () => {
    const result1 = validateCO("9 234 5678"); // Invalid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateCO("0 234 5678"); // Invalid area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject landline numbers with wrong length", () => {
    const result1 = validateCO("1 234 56"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateCO("1 234 567890"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateCO("300 123");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateCO("123456");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateCO("300 123 456789");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateCO("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateCO("300 abc 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateCO("1#234#5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept valid mobile prefixes", () => {
    expect(validateCO("3001234567").isValid).toBe(true); // 300
    expect(validateCO("3101234567").isValid).toBe(true); // 310
    expect(validateCO("3201234567").isValid).toBe(true); // 320
    expect(validateCO("3301234567").isValid).toBe(true); // 330
    expect(validateCO("3401234567").isValid).toBe(true); // 340
    expect(validateCO("3501234567").isValid).toBe(true); // 350
    expect(validateCO("3601234567").isValid).toBe(true); // 360
    expect(validateCO("3701234567").isValid).toBe(true); // 370
    expect(validateCO("3801234567").isValid).toBe(true); // 380
    expect(validateCO("3901234567").isValid).toBe(true); // 390
  });

  test("should accept valid landline area codes", () => {
    expect(validateCO("1234567").isValid).toBe(true); // Bogotá
    expect(validateCO("2234567").isValid).toBe(true); // Cali
    expect(validateCO("4234567").isValid).toBe(true); // Medellín
    expect(validateCO("5234567").isValid).toBe(true); // Barranquilla/Cartagena
    expect(validateCO("6234567").isValid).toBe(true); // Manizales/Pereira
    expect(validateCO("7234567").isValid).toBe(true); // Bucaramanga
    expect(validateCO("8234567").isValid).toBe(true); // Villavicencio
  });
});
