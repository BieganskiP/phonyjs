import { describe, test, expect } from "vitest";
import { validateEC } from "../../src/validators/south-america/ec";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateEC - Ecuadorian phone numbers", () => {
  test("should accept valid Ecuadorian mobile numbers", () => {
    expect(validateEC("09 123 4567").isValid).toBe(true); // Mobile (9 digits)
    expect(validateEC("098 234 567").isValid).toBe(true); // Mobile (9 digits)
    expect(validateEC("099 345 678").isValid).toBe(true); // Mobile (9 digits)
    expect(validateEC("091234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Ecuadorian landline numbers", () => {
    expect(validateEC("2 123 4567").isValid).toBe(true); // Landline Quito (8 digits)
    expect(validateEC("4 234 567").isValid).toBe(true); // Landline Guayaquil (7 digits)
    expect(validateEC("7 345 678").isValid).toBe(true); // Landline (7 digits)
    expect(validateEC("21234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateEC("593 9 123 4567").isValid).toBe(true);
    expect(validateEC("+593 2 123 4567").isValid).toBe(true);
    expect(validateEC("00593 9 234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateEC("09-123-4567").isValid).toBe(true);
    expect(validateEC("(2) 123-4567").isValid).toBe(true);
    expect(validateEC("4.234.567").isValid).toBe(true);
    expect(validateEC("0 9 123 4567").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 9 digits", () => {
    const result1 = validateEC("09 123 456"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateEC("09 123 45678"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject landline numbers with wrong length", () => {
    const result1 = validateEC("2 123 45"); // 5 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateEC("2 123 45678"); // 9 digits (but not starting with 0)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateEC("09 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateEC("2 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });
});


