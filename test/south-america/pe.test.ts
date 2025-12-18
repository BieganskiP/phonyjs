import { describe, test, expect } from "vitest";
import { validatePE } from "../../src/validators/south-america/pe";
import { ErrorCodes } from "../../src/errorCodes";

describe("validatePE - Peruvian phone numbers", () => {
  test("should accept valid Peruvian mobile numbers", () => {
    expect(validatePE("9 1234 5678").isValid).toBe(true); // Mobile
    expect(validatePE("9 8765 4321").isValid).toBe(true); // Mobile
    expect(validatePE("912345678").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Peruvian landline numbers - Lima", () => {
    expect(validatePE("1 234 5678").isValid).toBe(true); // Lima (8 digits)
    expect(validatePE("12345678").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Peruvian landline numbers - regional", () => {
    expect(validatePE("44 123 456").isValid).toBe(true); // Ica (7 digits with 2-digit area code)
    expect(validatePE("54 123 456").isValid).toBe(true); // Arequipa (7 digits with 2-digit area code)
    expect(validatePE("4412345").isValid).toBe(false); // 7 digits - too short for 2-digit area code
    expect(validatePE("44123456").isValid).toBe(true); // Without formatting (8 digits)
  });

  test("should accept phone numbers with country code", () => {
    expect(validatePE("51 9 1234 5678").isValid).toBe(true);
    expect(validatePE("+51 1 234 5678").isValid).toBe(true);
    expect(validatePE("0051 44 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePE("9-1234-5678").isValid).toBe(true);
    expect(validatePE("(1) 234-5678").isValid).toBe(true);
    expect(validatePE("44.123.456").isValid).toBe(true);
    expect(validatePE("9 1234 5678").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 9 digits", () => {
    const result1 = validatePE("9 1234 567"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validatePE("9 1234 56789"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject Lima landline numbers not exactly 8 digits", () => {
    const result1 = validatePE("1 234 567"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validatePE("1 234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject regional landline numbers with wrong length", () => {
    const result1 = validatePE("44 123 4567"); // 9 digits for 2-digit area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validatePE("44 12345"); // 7 digits but should be 8 for 2-digit area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject phone numbers with invalid area codes", () => {
    const result1 = validatePE("2 234 5678"); // Invalid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validatePE("99 123 456"); // Invalid - starts with 9 (mobile) but wrong length
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validatePE("9 123 45");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validatePE("123456");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validatePE("9 1234 567890");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validatePE("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validatePE("9 abc 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validatePE("1#234#5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept valid area codes", () => {
    // Lima
    expect(validatePE("12345678").isValid).toBe(true);
    
    // Regional 2-digit area codes
    expect(validatePE("44123456").isValid).toBe(true); // Ica
    expect(validatePE("54123456").isValid).toBe(true); // Arequipa
    expect(validatePE("64123456").isValid).toBe(true); // Cusco
    expect(validatePE("74123456").isValid).toBe(true); // Huancayo
    expect(validatePE("76123456").isValid).toBe(true); // Chiclayo
    expect(validatePE("84123456").isValid).toBe(true); // Puno
  });

  test("should accept mobile numbers", () => {
    expect(validatePE("912345678").isValid).toBe(true);
    expect(validatePE("987654321").isValid).toBe(true);
    expect(validatePE("911111111").isValid).toBe(true);
  });
});
