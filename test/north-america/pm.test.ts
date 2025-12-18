import { describe, test, expect } from "vitest";
import { validatePM } from "../../src/validators/north-america/pm";
import { ErrorCodes } from "../../src/errorCodes";

describe("validatePM - Saint Pierre and Miquelon phone numbers", () => {
  test("should accept valid Saint Pierre and Miquelon phone numbers", () => {
    expect(validatePM("508 12 34 56").isValid).toBe(true);
    expect(validatePM("508 23 45 67").isValid).toBe(true);
    expect(validatePM("508 34 56 78").isValid).toBe(true);
    expect(validatePM("508123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validatePM("+508 12 34 56").isValid).toBe(true);
    expect(validatePM("00508 23 45 67").isValid).toBe(true);
    expect(validatePM("508 345678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePM("508-12-34-56").isValid).toBe(true);
    expect(validatePM("508.12.34.56").isValid).toBe(true);
    expect(validatePM("508 123456").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validatePM("508 12 345"); // 5 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePM("508 1234"); // 4 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validatePM("508 12 34 567"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validatePM("508 1234 5678"); // 8 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validatePM("508 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validatePM("508 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code", () => {
    expect(validatePM("123456").isValid).toBe(true); // 6 digits without country code
    expect(validatePM("234567").isValid).toBe(true);
    expect(validatePM("12 34 56").isValid).toBe(true); // With formatting
  });
});


