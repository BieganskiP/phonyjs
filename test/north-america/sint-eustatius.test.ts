import { describe, test, expect } from "vitest";
import { validateSintEustatius } from "../../src/validators/north-america/sint-eustatius";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSintEustatius - Sint Eustatius phone numbers", () => {
  test("should accept valid Sint Eustatius phone numbers", () => {
    expect(validateSintEustatius("599 3 123 4567").isValid).toBe(true);
    expect(validateSintEustatius("599 3 234 5678").isValid).toBe(true);
    expect(validateSintEustatius("599 3 345 6789").isValid).toBe(true);
    expect(validateSintEustatius("59931234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateSintEustatius("+599 3 123 4567").isValid).toBe(true);
    expect(validateSintEustatius("00599 3 234 5678").isValid).toBe(true);
    expect(validateSintEustatius("005993 3456789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSintEustatius("599-3-123-4567").isValid).toBe(true);
    expect(validateSintEustatius("599.3.123.4567").isValid).toBe(true);
    expect(validateSintEustatius("599 3 1234567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateSintEustatius("599 3 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateSintEustatius("599 3 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateSintEustatius("599 3 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateSintEustatius("599 3 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateSintEustatius("599 3 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateSintEustatius("599 3 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers with area code only", () => {
    expect(validateSintEustatius("3 123 4567").isValid).toBe(true); // 8 digits with area code 3
    expect(validateSintEustatius("3 234 5678").isValid).toBe(true);
    expect(validateSintEustatius("31234567").isValid).toBe(true); // Without formatting
  });
});
