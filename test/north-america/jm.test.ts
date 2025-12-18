import { describe, test, expect } from "vitest";
import { validateJM } from "../../src/validators/north-america/jm";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateJM - Jamaican phone numbers", () => {
  test("should accept valid Jamaican phone numbers", () => {
    expect(validateJM("876 123 4567").isValid).toBe(true);
    expect(validateJM("876 234 5678").isValid).toBe(true);
    expect(validateJM("876 345 6789").isValid).toBe(true);
    expect(validateJM("8761234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateJM("1 876 123 4567").isValid).toBe(true);
    expect(validateJM("+1 876 234 5678").isValid).toBe(true);
    expect(validateJM("001876 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateJM("876-123-4567").isValid).toBe(true);
    expect(validateJM("876.123.4567").isValid).toBe(true);
    expect(validateJM("(876) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateJM("876 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateJM("876 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateJM("876 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateJM("876 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateJM("876 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateJM("876 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should handle numbers without area code", () => {
    expect(validateJM("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateJM("234 5678").isValid).toBe(true);
    expect(validateJM("1234567").isValid).toBe(true); // Without formatting
  });
});


