import { describe, test, expect } from "vitest";
import { validateDO } from "../../src/validators/north-america/do";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateDO - Dominican Republic phone numbers", () => {
  test("should accept valid Dominican Republic phone numbers", () => {
    expect(validateDO("809 123 4567").isValid).toBe(true);
    expect(validateDO("829 234 5678").isValid).toBe(true);
    expect(validateDO("849 345 6789").isValid).toBe(true);
    expect(validateDO("8091234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateDO("1 809 123 4567").isValid).toBe(true);
    expect(validateDO("+1 829 234 5678").isValid).toBe(true);
    expect(validateDO("001849 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateDO("809-123-4567").isValid).toBe(true);
    expect(validateDO("829.123.4567").isValid).toBe(true);
    expect(validateDO("(849) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateDO("123 456"); // 6 digits without area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateDO("12345"); // 5 digits without area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateDO("809 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateDO("829 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid area codes", () => {
    const result1 = validateDO("1 808 123 4567"); // Invalid area code (808), correct length
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateDO("850 123 4567"); // Invalid area code (850), correct length
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateDO("809 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateDO("829 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should reject numbers without valid area code", () => {
    const result1 = validateDO("123 4567"); // 7 digits without valid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateDO("1234567"); // 7 digits without formatting
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should accept all valid area codes", () => {
    expect(validateDO("809 123 4567").isValid).toBe(true); // 809
    expect(validateDO("829 123 4567").isValid).toBe(true); // 829
    expect(validateDO("849 123 4567").isValid).toBe(true); // 849
  });
});
