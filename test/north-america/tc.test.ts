import { describe, test, expect } from "vitest";
import { validateTC } from "../../src/validators/north-america/tc";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateTC - Turks and Caicos Islands phone numbers", () => {
  test("should accept valid Turks and Caicos Islands phone numbers", () => {
    expect(validateTC("649 123 4567").isValid).toBe(true);
    expect(validateTC("649 234 5678").isValid).toBe(true);
    expect(validateTC("649 345 6789").isValid).toBe(true);
    expect(validateTC("6491234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateTC("1 649 123 4567").isValid).toBe(true);
    expect(validateTC("+1 649 234 5678").isValid).toBe(true);
    expect(validateTC("001649 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTC("649-123-4567").isValid).toBe(true);
    expect(validateTC("649.123.4567").isValid).toBe(true);
    expect(validateTC("(649) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateTC("649 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateTC("649 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateTC("649 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateTC("649 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateTC("649 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateTC("649 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateTC("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateTC("234 5678").isValid).toBe(true);
    expect(validateTC("1234567").isValid).toBe(true); // Without formatting
  });
});


