import { describe, test, expect } from "vitest";
import { validateTT } from "../../src/validators/north-america/tt";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateTT - Trinidad and Tobago phone numbers", () => {
  test("should accept valid Trinidad and Tobago phone numbers", () => {
    expect(validateTT("868 123 4567").isValid).toBe(true);
    expect(validateTT("868 234 5678").isValid).toBe(true);
    expect(validateTT("868 345 6789").isValid).toBe(true);
    expect(validateTT("8681234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateTT("1 868 123 4567").isValid).toBe(true);
    expect(validateTT("+1 868 234 5678").isValid).toBe(true);
    expect(validateTT("001868 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTT("868-123-4567").isValid).toBe(true);
    expect(validateTT("868.123.4567").isValid).toBe(true);
    expect(validateTT("(868) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateTT("868 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateTT("868 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateTT("868 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateTT("868 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateTT("868 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateTT("868 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should handle numbers without area code", () => {
    expect(validateTT("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateTT("234 5678").isValid).toBe(true);
    expect(validateTT("1234567").isValid).toBe(true); // Without formatting
  });
});


