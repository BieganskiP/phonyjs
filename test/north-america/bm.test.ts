import { describe, test, expect } from "vitest";
import { validateBM } from "../../src/validators/north-america/bm";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateBM - Bermuda phone numbers", () => {
  test("should accept valid Bermuda phone numbers", () => {
    expect(validateBM("441 123 4567").isValid).toBe(true);
    expect(validateBM("441 234 5678").isValid).toBe(true);
    expect(validateBM("441 345 6789").isValid).toBe(true);
    expect(validateBM("4411234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateBM("1 441 123 4567").isValid).toBe(true);
    expect(validateBM("+1 441 234 5678").isValid).toBe(true);
    expect(validateBM("001441 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBM("441-123-4567").isValid).toBe(true);
    expect(validateBM("441.123.4567").isValid).toBe(true);
    expect(validateBM("(441) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateBM("441 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateBM("441 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateBM("441 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateBM("441 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateBM("441 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateBM("441 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateBM("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateBM("234 5678").isValid).toBe(true);
    expect(validateBM("1234567").isValid).toBe(true); // Without formatting
  });
});


