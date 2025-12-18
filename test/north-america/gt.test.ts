import { describe, test, expect } from "vitest";
import { validateGT } from "../../src/validators/north-america/gt";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGT - Guatemalan phone numbers", () => {
  test("should accept valid Guatemalan mobile numbers", () => {
    expect(validateGT("5123 4567").isValid).toBe(true); // Mobile
    expect(validateGT("5234 5678").isValid).toBe(true); // Mobile
    expect(validateGT("5345 6789").isValid).toBe(true); // Mobile
    expect(validateGT("51234567").isValid).toBe(true); // Mobile without formatting
  });

  test("should accept valid Guatemalan landline numbers", () => {
    expect(validateGT("2234 5678").isValid).toBe(true); // Landline
    expect(validateGT("2345 6789").isValid).toBe(true); // Landline
    expect(validateGT("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGT("502 5123 4567").isValid).toBe(true);
    expect(validateGT("+502 2234 5678").isValid).toBe(true);
    expect(validateGT("00502 5234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGT("5123-4567").isValid).toBe(true);
    expect(validateGT("(2234) 5678").isValid).toBe(true);
    expect(validateGT("2234.5678").isValid).toBe(true);
    expect(validateGT("5 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateGT("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateGT("3123 4567"); // Invalid prefix 3 (old mobile)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateGT("4123 4567"); // Invalid prefix 4 (old mobile)
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateGT("7123 4567"); // Invalid prefix 7 (old landline)
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateGT("312 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateGT("1234567");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateGT("5123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateGT("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGT("312a 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGT("3123@4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateGT("21234567").isValid).toBe(true); // Landline
    expect(validateGT("51234567").isValid).toBe(true); // Mobile
  });
});
