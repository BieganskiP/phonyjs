import { describe, test, expect } from "vitest";
import { validateAG } from "../../src/validators/north-america/ag";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateAG - Antigua and Barbuda phone numbers", () => {
  test("should accept valid Antigua and Barbuda phone numbers", () => {
    expect(validateAG("268 123 4567").isValid).toBe(true);
    expect(validateAG("268 234 5678").isValid).toBe(true);
    expect(validateAG("268 345 6789").isValid).toBe(true);
    expect(validateAG("2681234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateAG("1 268 123 4567").isValid).toBe(true);
    expect(validateAG("+1 268 234 5678").isValid).toBe(true);
    expect(validateAG("001268 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAG("268-123-4567").isValid).toBe(true);
    expect(validateAG("268.123.4567").isValid).toBe(true);
    expect(validateAG("(268) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateAG("268 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateAG("268 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateAG("268 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateAG("268 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateAG("268 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateAG("268 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateAG("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateAG("234 5678").isValid).toBe(true);
    expect(validateAG("1234567").isValid).toBe(true); // Without formatting
  });
});
