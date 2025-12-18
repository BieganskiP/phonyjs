import { describe, test, expect } from "vitest";
import { validateHN } from "../../src/validators/north-america/hn";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateHN - Honduran phone numbers", () => {
  test("should accept valid Honduran mobile numbers", () => {
    expect(validateHN("9123 4567").isValid).toBe(true); // Mobile
    expect(validateHN("9234 5678").isValid).toBe(true); // Mobile
    expect(validateHN("9345 6789").isValid).toBe(true); // Mobile
    expect(validateHN("9456 7890").isValid).toBe(true); // Mobile
    expect(validateHN("91234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Honduran landline numbers", () => {
    expect(validateHN("2234 5678").isValid).toBe(true); // Landline
    expect(validateHN("2345 6789").isValid).toBe(true); // Landline
    expect(validateHN("2456 7890").isValid).toBe(true); // Landline
    expect(validateHN("2567 8901").isValid).toBe(true); // Landline
    expect(validateHN("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateHN("504 9123 4567").isValid).toBe(true);
    expect(validateHN("+504 2234 5678").isValid).toBe(true);
    expect(validateHN("00504 9234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateHN("9123-4567").isValid).toBe(true);
    expect(validateHN("(2234) 5678").isValid).toBe(true);
    expect(validateHN("2234.5678").isValid).toBe(true);
    expect(validateHN("9 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateHN("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateHN("3123 4567"); // Invalid prefix 3 (old mobile)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateHN("7123 4567"); // Invalid prefix 7 (old mobile)
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateHN("8123 4567"); // Invalid prefix 8 (old mobile)
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateHN("312 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateHN("1234567");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateHN("3123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateHN("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateHN("312a4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateHN("3123@4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateHN("21234567").isValid).toBe(true); // Landline
    expect(validateHN("91234567").isValid).toBe(true); // Mobile
  });
});
