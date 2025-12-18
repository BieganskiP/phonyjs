import { describe, test, expect } from "vitest";
import { validatePR } from "../../src/validators/north-america/pr";
import { ErrorCodes } from "../../src/errorCodes";

describe("validatePR - Puerto Rico phone numbers", () => {
  test("should accept valid Puerto Rico phone numbers", () => {
    expect(validatePR("787 123 4567").isValid).toBe(true);
    expect(validatePR("939 234 5678").isValid).toBe(true);
    expect(validatePR("787 345 6789").isValid).toBe(true);
    expect(validatePR("7871234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validatePR("1 787 123 4567").isValid).toBe(true);
    expect(validatePR("+1 939 234 5678").isValid).toBe(true);
    expect(validatePR("001787 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePR("787-123-4567").isValid).toBe(true);
    expect(validatePR("939.123.4567").isValid).toBe(true);
    expect(validatePR("(787) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validatePR("123 456"); // 6 digits without area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePR("12345"); // 5 digits without area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validatePR("787 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validatePR("787 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid area codes", () => {
    const result1 = validatePR("1 788 123 4567"); // Invalid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validatePR("940 123 4567"); // Invalid area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validatePR("787 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validatePR("939 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should reject numbers without valid area code", () => {
    const result1 = validatePR("123 4567"); // 7 digits without valid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePR("1234567"); // 7 digits without formatting
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should accept all valid area codes", () => {
    expect(validatePR("787 123 4567").isValid).toBe(true); // 787
    expect(validatePR("939 123 4567").isValid).toBe(true); // 939
  });
});
