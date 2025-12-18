import { describe, test, expect } from "vitest";
import { validateDM } from "../../src/validators/north-america/dm";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateDM - Dominica phone numbers", () => {
  test("should accept valid Dominica phone numbers", () => {
    expect(validateDM("767 123 4567").isValid).toBe(true);
    expect(validateDM("767 234 5678").isValid).toBe(true);
    expect(validateDM("767 345 6789").isValid).toBe(true);
    expect(validateDM("7671234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateDM("1 767 123 4567").isValid).toBe(true);
    expect(validateDM("+1 767 234 5678").isValid).toBe(true);
    expect(validateDM("001767 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateDM("767-123-4567").isValid).toBe(true);
    expect(validateDM("767.123.4567").isValid).toBe(true);
    expect(validateDM("(767) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateDM("767 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateDM("767 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateDM("767 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateDM("767 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateDM("767 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateDM("767 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateDM("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateDM("234 5678").isValid).toBe(true);
    expect(validateDM("1234567").isValid).toBe(true); // Without formatting
  });
});
