import { describe, test, expect } from "vitest";
import { validateSV } from "../../src/validators/north-america/sv";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSV - Salvadoran phone numbers", () => {
  test("should accept valid Salvadoran mobile numbers", () => {
    expect(validateSV("7123 4567").isValid).toBe(true); // Mobile
    expect(validateSV("7234 5678").isValid).toBe(true); // Mobile
    expect(validateSV("7345 6789").isValid).toBe(true); // Mobile
    expect(validateSV("71234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Salvadoran landline numbers", () => {
    expect(validateSV("2234 5678").isValid).toBe(true); // Landline
    expect(validateSV("2345 6789").isValid).toBe(true); // Landline
    expect(validateSV("2456 7890").isValid).toBe(true); // Landline
    expect(validateSV("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateSV("503 7123 4567").isValid).toBe(true);
    expect(validateSV("+503 2234 5678").isValid).toBe(true);
    expect(validateSV("00503 7234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSV("7123-4567").isValid).toBe(true);
    expect(validateSV("(2234) 5678").isValid).toBe(true);
    expect(validateSV("2234.5678").isValid).toBe(true);
    expect(validateSV("7 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateSV("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateSV("4123 4567"); // Invalid prefix 4 (old landline)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateSV("6123 4567"); // Invalid prefix 6 (old mobile)
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateSV("9123 4567"); // Invalid prefix 9 (old mobile)
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateSV("712 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateSV("1234567");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateSV("7123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateSV("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateSV("712a4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateSV("7123@4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateSV("21234567").isValid).toBe(true); // Landline
    expect(validateSV("71234567").isValid).toBe(true); // Mobile
  });
});
