import { describe, test, expect } from "vitest";
import { validateVI } from "../../src/validators/north-america/vi";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateVI - US Virgin Islands phone numbers", () => {
  test("should accept valid US Virgin Islands phone numbers", () => {
    expect(validateVI("340 123 4567").isValid).toBe(true);
    expect(validateVI("340 234 5678").isValid).toBe(true);
    expect(validateVI("340 345 6789").isValid).toBe(true);
    expect(validateVI("3401234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateVI("1 340 123 4567").isValid).toBe(true);
    expect(validateVI("+1 340 234 5678").isValid).toBe(true);
    expect(validateVI("001340 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateVI("340-123-4567").isValid).toBe(true);
    expect(validateVI("340.123.4567").isValid).toBe(true);
    expect(validateVI("(340) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateVI("340 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateVI("340 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateVI("340 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateVI("340 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateVI("340 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateVI("340 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateVI("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateVI("234 5678").isValid).toBe(true);
    expect(validateVI("1234567").isValid).toBe(true); // Without formatting
  });
});


