import { describe, test, expect } from "vitest";
import { validateSA } from "../../src/validators/asia/sa";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSA - Saudi Arabian phone numbers", () => {
  test("should accept valid Saudi mobile numbers", () => {
    expect(validateSA("0501234567").isValid).toBe(true);
    expect(validateSA("0531234567").isValid).toBe(true);
    expect(validateSA("0541234567").isValid).toBe(true);
    expect(validateSA("0551234567").isValid).toBe(true);
    expect(validateSA("0561234567").isValid).toBe(true);
    expect(validateSA("0581234567").isValid).toBe(true);
    expect(validateSA("0591234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSA("050 123 4567").isValid).toBe(true);
    expect(validateSA("050-123-4567").isValid).toBe(true);
    expect(validateSA("050.123.4567").isValid).toBe(true);
  });

  test("should accept international format (+966)", () => {
    expect(validateSA("+966501234567").isValid).toBe(true);
    expect(validateSA("+966 50 123 4567").isValid).toBe(true);
  });

  test("should reject invalid mobile prefixes", () => {
    const result = validateSA("0511234567"); // 051 is not valid
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_MOBILE_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateSA("050123");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateSA("050123456789");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers not starting with 05", () => {
    const result = validateSA("0601234567");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    const result = validateSA("----------");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with letters mixed in", () => {
    const result = validateSA("050abc4567");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });
});
