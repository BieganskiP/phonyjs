import { describe, test, expect } from "vitest";
import { validateUY } from "../../src/validators/south-america/uy";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateUY - Uruguayan phone numbers", () => {
  test("should accept valid Uruguayan mobile numbers", () => {
    expect(validateUY("9123 4567").isValid).toBe(true); // Mobile
    expect(validateUY("9234 5678").isValid).toBe(true); // Mobile
    expect(validateUY("9345 6789").isValid).toBe(true); // Mobile
    expect(validateUY("91234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Uruguayan landline numbers", () => {
    expect(validateUY("2 123 4567").isValid).toBe(true); // Landline Montevideo (8 digits)
    expect(validateUY("42 234 56").isValid).toBe(true); // Landline (7 digits)
    expect(validateUY("472 3456").isValid).toBe(true); // Landline (7 digits)
    expect(validateUY("21234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateUY("598 9123 4567").isValid).toBe(true);
    expect(validateUY("+598 2 123 4567").isValid).toBe(true);
    expect(validateUY("00598 9234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateUY("9123-4567").isValid).toBe(true);
    expect(validateUY("(2) 123-4567").isValid).toBe(true);
    expect(validateUY("42.234.56").isValid).toBe(true);
    expect(validateUY("9 123 4567").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 8 digits", () => {
    const result1 = validateUY("9123 456"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateUY("9123 45678"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject landline numbers with wrong length", () => {
    const result1 = validateUY("2 123 45"); // 5 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateUY("2 123 45678"); // 9 digits (but not starting with 9)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateUY("9123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateUY("2 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });
});


