import { describe, test, expect } from "vitest";
import { validateLC } from "../../src/validators/north-america/lc";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateLC - Saint Lucia phone numbers", () => {
  test("should accept valid Saint Lucia phone numbers", () => {
    expect(validateLC("758 123 4567").isValid).toBe(true);
    expect(validateLC("758 234 5678").isValid).toBe(true);
    expect(validateLC("758 345 6789").isValid).toBe(true);
    expect(validateLC("7581234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateLC("1 758 123 4567").isValid).toBe(true);
    expect(validateLC("+1 758 234 5678").isValid).toBe(true);
    expect(validateLC("001758 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateLC("758-123-4567").isValid).toBe(true);
    expect(validateLC("758.123.4567").isValid).toBe(true);
    expect(validateLC("(758) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateLC("758 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateLC("758 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateLC("758 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateLC("758 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateLC("758 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateLC("758 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateLC("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateLC("234 5678").isValid).toBe(true);
    expect(validateLC("1234567").isValid).toBe(true); // Without formatting
  });
});
