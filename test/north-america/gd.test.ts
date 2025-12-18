import { describe, test, expect } from "vitest";
import { validateGD } from "../../src/validators/north-america/gd";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGD - Grenada phone numbers", () => {
  test("should accept valid Grenada phone numbers", () => {
    expect(validateGD("473 123 4567").isValid).toBe(true);
    expect(validateGD("473 234 5678").isValid).toBe(true);
    expect(validateGD("473 345 6789").isValid).toBe(true);
    expect(validateGD("4731234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGD("1 473 123 4567").isValid).toBe(true);
    expect(validateGD("+1 473 234 5678").isValid).toBe(true);
    expect(validateGD("001473 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGD("473-123-4567").isValid).toBe(true);
    expect(validateGD("473.123.4567").isValid).toBe(true);
    expect(validateGD("(473) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateGD("473 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateGD("473 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateGD("473 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateGD("473 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGD("473 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGD("473 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateGD("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateGD("234 5678").isValid).toBe(true);
    expect(validateGD("1234567").isValid).toBe(true); // Without formatting
  });
});
