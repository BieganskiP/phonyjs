import { describe, test, expect } from "vitest";
import { validateHT } from "../../src/validators/north-america/ht";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateHT - Haitian phone numbers", () => {
  test("should accept valid Haitian mobile numbers", () => {
    expect(validateHT("3123 4567").isValid).toBe(true); // Mobile (3)
    expect(validateHT("4234 5678").isValid).toBe(true); // Mobile (4)
    expect(validateHT("5345 6789").isValid).toBe(true); // Mobile (5)
    expect(validateHT("31234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Haitian landline numbers", () => {
    expect(validateHT("2123 4567").isValid).toBe(true); // Landline (2)
    expect(validateHT("2234 5678").isValid).toBe(true); // Landline
    expect(validateHT("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateHT("509 3123 4567").isValid).toBe(true);
    expect(validateHT("+509 2234 5678").isValid).toBe(true);
    expect(validateHT("00509 4345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateHT("3123-4567").isValid).toBe(true);
    expect(validateHT("2234.5678").isValid).toBe(true);
    expect(validateHT("(509) 3123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateHT("312 4567"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateHT("31234"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateHT("3123 45678"); // 9 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateHT("31234 56789"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateHT("1123 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateHT("6234 5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateHT("0123 4567");
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateHT("3123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateHT("2234 567#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateHT("21234567").isValid).toBe(true); // Landline (2)
    expect(validateHT("31234567").isValid).toBe(true); // Mobile (3)
    expect(validateHT("41234567").isValid).toBe(true); // Mobile (4)
    expect(validateHT("51234567").isValid).toBe(true); // Mobile (5)
  });
});


