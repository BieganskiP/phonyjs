import { describe, test, expect } from "vitest";
import { validateUS } from "../src/validators/us";
import { ErrorCodes } from "../src/errorCodes";

describe("validateUS - US phone numbers", () => {
  test("should accept valid US phone numbers", () => {
    expect(validateUS("2125551234").isValid).toBe(true);
    expect(validateUS("3105551234").isValid).toBe(true);
    expect(validateUS("9175551234").isValid).toBe(true);
  });

  test("should accept phone numbers with country code", () => {
    expect(validateUS("12125551234").isValid).toBe(true);
    expect(validateUS("1-212-555-1234").isValid).toBe(true);
    expect(validateUS("+1 212 555 1234").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateUS("212-555-1234").isValid).toBe(true);
    expect(validateUS("(212) 555-1234").isValid).toBe(true);
    expect(validateUS("212.555.1234").isValid).toBe(true);
    expect(validateUS("212 555 1234").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid area code", () => {
    const result1 = validateUS("0125551234");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateUS("1125551234");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with invalid exchange code", () => {
    const result1 = validateUS("2120551234");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_EXCHANGE_CODE);

    const result2 = validateUS("2121551234");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_EXCHANGE_CODE);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateUS("212555123");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateUS("123");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateUS("21255512345");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateUS("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    const result1 = validateUS("abc-def-ghij");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateUS("----------");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });
});




