import { describe, test, expect } from "vitest";
import { validateBB } from "../../src/validators/north-america/bb";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateBB - Barbadian phone numbers", () => {
  test("should accept valid Barbadian phone numbers", () => {
    expect(validateBB("246 123 4567").isValid).toBe(true);
    expect(validateBB("246 234 5678").isValid).toBe(true);
    expect(validateBB("246 345 6789").isValid).toBe(true);
    expect(validateBB("2461234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateBB("1 246 123 4567").isValid).toBe(true);
    expect(validateBB("+1 246 234 5678").isValid).toBe(true);
    expect(validateBB("001246 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBB("246-123-4567").isValid).toBe(true);
    expect(validateBB("246.123.4567").isValid).toBe(true);
    expect(validateBB("(246) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateBB("246 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateBB("246 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateBB("246 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateBB("246 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateBB("246 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateBB("246 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should handle numbers without area code", () => {
    expect(validateBB("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateBB("234 5678").isValid).toBe(true);
    expect(validateBB("1234567").isValid).toBe(true); // Without formatting
  });
});


