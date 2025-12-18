import { describe, test, expect } from "vitest";
import { validateMX } from "../../src/validators/north-america/mx";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateMX - Mexican phone numbers", () => {
  test("should accept valid Mexican mobile numbers", () => {
    expect(validateMX("55 1234 5678").isValid).toBe(true); // Mexico City
    expect(validateMX("33 1234 5678").isValid).toBe(true); // Guadalajara
    expect(validateMX("81 1234 5678").isValid).toBe(true); // Monterrey
    expect(validateMX("2221234567").isValid).toBe(true); // Puebla
    expect(validateMX("2281234567").isValid).toBe(true); // Veracruz
  });

  test("should accept phone numbers with country code", () => {
    expect(validateMX("52 55 1234 5678").isValid).toBe(true);
    expect(validateMX("+52 33 1234 5678").isValid).toBe(true);
    expect(validateMX("0052 81 1234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMX("55-1234-5678").isValid).toBe(true);
    expect(validateMX("(33) 1234-5678").isValid).toBe(true);
    expect(validateMX("81.1234.5678").isValid).toBe(true);
    expect(validateMX("222 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateMX("01 1234 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateMX("41 1234 5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateMX("55 123 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateMX("123456789");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateMX("55 1234 56789");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateMX("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateMX("55 abc 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateMX("55#1234#5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept valid numbers starting with allowed digits", () => {
    expect(validateMX("1123456789").isValid).toBe(true); // starts with 1
    expect(validateMX("2123456789").isValid).toBe(true); // starts with 2
    expect(validateMX("3123456789").isValid).toBe(true); // starts with 3
    expect(validateMX("5123456789").isValid).toBe(true); // starts with 5
    expect(validateMX("6123456789").isValid).toBe(true); // starts with 6
    expect(validateMX("7123456789").isValid).toBe(true); // starts with 7
    expect(validateMX("8123456789").isValid).toBe(true); // starts with 8
    expect(validateMX("9123456789").isValid).toBe(true); // starts with 9
  });
});


