import { describe, test, expect } from "vitest";
import { validateSaba } from "../../src/validators/north-america/saba";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSaba - Saba phone numbers", () => {
  test("should accept valid Saba phone numbers", () => {
    expect(validateSaba("599 4 123 4567").isValid).toBe(true);
    expect(validateSaba("599 4 234 5678").isValid).toBe(true);
    expect(validateSaba("599 4 345 6789").isValid).toBe(true);
    expect(validateSaba("59941234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateSaba("+599 4 123 4567").isValid).toBe(true);
    expect(validateSaba("00599 4 234 5678").isValid).toBe(true);
    expect(validateSaba("005994 3456789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSaba("599-4-123-4567").isValid).toBe(true);
    expect(validateSaba("599.4.123.4567").isValid).toBe(true);
    expect(validateSaba("599 4 1234567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateSaba("599 4 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateSaba("599 4 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateSaba("599 4 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateSaba("599 4 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateSaba("599 4 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateSaba("599 4 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers with area code only", () => {
    expect(validateSaba("4 123 4567").isValid).toBe(true); // 8 digits with area code 4
    expect(validateSaba("4 234 5678").isValid).toBe(true);
    expect(validateSaba("41234567").isValid).toBe(true); // Without formatting
  });
});
