import { describe, test, expect } from "vitest";
import { validateGL } from "../../src/validators/north-america/gl";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGL - Greenland phone numbers", () => {
  test("should accept valid Greenland phone numbers", () => {
    expect(validateGL("299 12 34 56").isValid).toBe(true);
    expect(validateGL("299 23 45 67").isValid).toBe(true);
    expect(validateGL("299 34 56 78").isValid).toBe(true);
    expect(validateGL("299123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGL("+299 12 34 56").isValid).toBe(true);
    expect(validateGL("00299 23 45 67").isValid).toBe(true);
    expect(validateGL("299 345678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGL("299-12-34-56").isValid).toBe(true);
    expect(validateGL("299.12.34.56").isValid).toBe(true);
    expect(validateGL("299 123456").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateGL("299 12 345"); // 5 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateGL("299 1234"); // 4 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateGL("299 12 34 567"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateGL("299 1234 5678"); // 8 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGL("299 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGL("299 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code", () => {
    expect(validateGL("123456").isValid).toBe(true); // 6 digits without country code
    expect(validateGL("234567").isValid).toBe(true);
    expect(validateGL("12 34 56").isValid).toBe(true); // With formatting
  });
});


