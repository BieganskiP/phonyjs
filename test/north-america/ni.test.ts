import { describe, test, expect } from "vitest";
import { validateNI } from "../../src/validators/north-america/ni";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateNI - Nicaraguan phone numbers", () => {
  test("should accept valid Nicaraguan mobile numbers", () => {
    expect(validateNI("8123 4567").isValid).toBe(true); // Mobile
    expect(validateNI("8234 5678").isValid).toBe(true); // Mobile
    expect(validateNI("8345 6789").isValid).toBe(true); // Mobile
    expect(validateNI("81234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Nicaraguan landline numbers", () => {
    expect(validateNI("2234 5678").isValid).toBe(true); // Landline
    expect(validateNI("2345 6789").isValid).toBe(true); // Landline
    expect(validateNI("2456 7890").isValid).toBe(true); // Landline
    expect(validateNI("2567 8901").isValid).toBe(true); // Landline
    expect(validateNI("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateNI("505 8123 4567").isValid).toBe(true);
    expect(validateNI("+505 2234 5678").isValid).toBe(true);
    expect(validateNI("00505 8234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateNI("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateNI("3123 4567"); // Invalid prefix 3 (old landline)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateNI("5123 4567"); // Invalid prefix 5 (old mobile)
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateNI("7123 4567"); // Invalid prefix 7 (old mobile)
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateNI("512 456");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateNI("5123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should accept all valid prefixes", () => {
    expect(validateNI("21234567").isValid).toBe(true); // Landline
    expect(validateNI("81234567").isValid).toBe(true); // Mobile
  });
});
