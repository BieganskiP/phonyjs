import { describe, test, expect } from "vitest";
import { validateAI } from "../../src/validators/north-america/ai";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateAI - Anguilla phone numbers", () => {
  test("should accept valid Anguilla phone numbers", () => {
    expect(validateAI("264 123 4567").isValid).toBe(true);
    expect(validateAI("264 234 5678").isValid).toBe(true);
    expect(validateAI("264 345 6789").isValid).toBe(true);
    expect(validateAI("2641234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateAI("1 264 123 4567").isValid).toBe(true);
    expect(validateAI("+1 264 234 5678").isValid).toBe(true);
    expect(validateAI("001264 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAI("264-123-4567").isValid).toBe(true);
    expect(validateAI("264.123.4567").isValid).toBe(true);
    expect(validateAI("(264) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateAI("264 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateAI("264 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateAI("264 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateAI("264 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateAI("264 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateAI("264 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateAI("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateAI("234 5678").isValid).toBe(true);
    expect(validateAI("1234567").isValid).toBe(true); // Without formatting
  });
});


