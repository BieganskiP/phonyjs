import { describe, test, expect } from "vitest";
import { validateVE } from "../../src/validators/south-america/ve";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateVE - Venezuelan phone numbers", () => {
  test("should accept valid Venezuelan mobile numbers", () => {
    expect(validateVE("414 123 4567").isValid).toBe(true); // Mobile
    expect(validateVE("424 123 4567").isValid).toBe(true); // Mobile
    expect(validateVE("416 123 4567").isValid).toBe(true); // Mobile
    expect(validateVE("426 123 4567").isValid).toBe(true); // Mobile
    expect(validateVE("4141234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Venezuelan landline numbers", () => {
    expect(validateVE("212 123 4567").isValid).toBe(true); // Caracas
    expect(validateVE("241 123 4567").isValid).toBe(true); // Valencia
    expect(validateVE("261 123 4567").isValid).toBe(true); // Maracaibo
    expect(validateVE("281 123 4567").isValid).toBe(true); // Barcelona/Puerto La Cruz
    expect(validateVE("295 123 4567").isValid).toBe(true); // Barquisimeto
    expect(validateVE("2121234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateVE("58 414 123 4567").isValid).toBe(true);
    expect(validateVE("+58 212 123 4567").isValid).toBe(true);
    expect(validateVE("0058 424 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateVE("414-123-4567").isValid).toBe(true);
    expect(validateVE("(212) 123-4567").isValid).toBe(true);
    expect(validateVE("424.123.4567").isValid).toBe(true);
    expect(validateVE("261 123 4567").isValid).toBe(true);
  });

  test("should reject mobile numbers with invalid prefixes", () => {
    const result1 = validateVE("404 123 4567"); // Invalid mobile prefix
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateVE("434 123 4567"); // Invalid mobile prefix
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateVE("444 123 4567"); // Invalid mobile prefix
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject landline numbers with invalid area codes", () => {
    const result1 = validateVE("111 123 4567"); // Invalid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateVE("222 123 4567"); // Invalid area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result3 = validateVE("333 123 4567"); // Invalid area code
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateVE("414 123 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateVE("123456789");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateVE("414 123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateVE("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateVE("414 abc 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateVE("212#123#4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid mobile prefixes", () => {
    expect(validateVE("4141234567").isValid).toBe(true); // 414
    expect(validateVE("4241234567").isValid).toBe(true); // 424
    expect(validateVE("4161234567").isValid).toBe(true); // 416
    expect(validateVE("4261234567").isValid).toBe(true); // 426
  });

  test("should accept all valid landline area codes", () => {
    expect(validateVE("2121234567").isValid).toBe(true); // Caracas
    expect(validateVE("2411234567").isValid).toBe(true); // Valencia
    expect(validateVE("2611234567").isValid).toBe(true); // Maracaibo
    expect(validateVE("2811234567").isValid).toBe(true); // Barcelona/Puerto La Cruz
    expect(validateVE("2951234567").isValid).toBe(true); // Barquisimeto
  });

  test("should ensure all numbers are exactly 10 digits", () => {
    expect(validateVE("4141234567").isValid).toBe(true); // 10 digits
    expect(validateVE("2121234567").isValid).toBe(true); // 10 digits
    
    // These should fail because they're not 10 digits
    expect(validateVE("414123456").isValid).toBe(false); // 9 digits
    expect(validateVE("41412345678").isValid).toBe(false); // 11 digits
  });
});


