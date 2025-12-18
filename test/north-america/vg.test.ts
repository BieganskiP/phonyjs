import { describe, test, expect } from "vitest";
import { validateVG } from "../../src/validators/north-america/vg";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateVG - British Virgin Islands phone numbers", () => {
  test("should accept valid British Virgin Islands phone numbers", () => {
    expect(validateVG("284 123 4567").isValid).toBe(true);
    expect(validateVG("284 234 5678").isValid).toBe(true);
    expect(validateVG("284 345 6789").isValid).toBe(true);
    expect(validateVG("2841234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateVG("1 284 123 4567").isValid).toBe(true);
    expect(validateVG("+1 284 234 5678").isValid).toBe(true);
    expect(validateVG("001284 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateVG("284-123-4567").isValid).toBe(true);
    expect(validateVG("284.123.4567").isValid).toBe(true);
    expect(validateVG("(284) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateVG("284 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateVG("284 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateVG("284 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateVG("284 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateVG("284 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateVG("284 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateVG("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateVG("234 5678").isValid).toBe(true);
    expect(validateVG("1234567").isValid).toBe(true); // Without formatting
  });
});


