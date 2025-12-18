import { describe, test, expect } from "vitest";
import { validateMS } from "../../src/validators/north-america/ms";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateMS - Montserrat phone numbers", () => {
  test("should accept valid Montserrat phone numbers", () => {
    expect(validateMS("664 123 4567").isValid).toBe(true);
    expect(validateMS("664 234 5678").isValid).toBe(true);
    expect(validateMS("664 345 6789").isValid).toBe(true);
    expect(validateMS("6641234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateMS("1 664 123 4567").isValid).toBe(true);
    expect(validateMS("+1 664 234 5678").isValid).toBe(true);
    expect(validateMS("001664 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMS("664-123-4567").isValid).toBe(true);
    expect(validateMS("664.123.4567").isValid).toBe(true);
    expect(validateMS("(664) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateMS("664 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateMS("664 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateMS("664 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateMS("664 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateMS("664 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateMS("664 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateMS("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateMS("234 5678").isValid).toBe(true);
    expect(validateMS("1234567").isValid).toBe(true); // Without formatting
  });
});


