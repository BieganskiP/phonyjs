import { describe, test, expect } from "vitest";
import { validateSX } from "../../src/validators/north-america/sx";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSX - Sint Maarten phone numbers", () => {
  test("should accept valid Sint Maarten phone numbers", () => {
    expect(validateSX("721 123 4567").isValid).toBe(true);
    expect(validateSX("721 234 5678").isValid).toBe(true);
    expect(validateSX("721 345 6789").isValid).toBe(true);
    expect(validateSX("7211234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateSX("1 721 123 4567").isValid).toBe(true);
    expect(validateSX("+1 721 234 5678").isValid).toBe(true);
    expect(validateSX("001721 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSX("721-123-4567").isValid).toBe(true);
    expect(validateSX("721.123.4567").isValid).toBe(true);
    expect(validateSX("(721) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateSX("721 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateSX("721 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateSX("721 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateSX("721 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateSX("721 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateSX("721 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateSX("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateSX("234 5678").isValid).toBe(true);
    expect(validateSX("1234567").isValid).toBe(true); // Without formatting
  });
});


