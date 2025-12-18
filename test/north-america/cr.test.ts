import { describe, test, expect } from "vitest";
import { validateCR } from "../../src/validators/north-america/cr";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateCR - Costa Rican phone numbers", () => {
  test("should accept valid Costa Rican mobile numbers", () => {
    expect(validateCR("6123 4567").isValid).toBe(true); // Mobile
    expect(validateCR("6234 5678").isValid).toBe(true); // Mobile
    expect(validateCR("6345 6789").isValid).toBe(true); // Mobile
    expect(validateCR("61234567").isValid).toBe(true); // Mobile without formatting
  });

  test("should accept valid Costa Rican landline numbers", () => {
    expect(validateCR("2234 5678").isValid).toBe(true); // San José area
    expect(validateCR("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCR("506 6123 4567").isValid).toBe(true);
    expect(validateCR("+506 2234 5678").isValid).toBe(true);
    expect(validateCR("00506 6234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCR("6123-4567").isValid).toBe(true);
    expect(validateCR("(2234) 5678").isValid).toBe(true);
    expect(validateCR("2234.5678").isValid).toBe(true);
    expect(validateCR("6 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateCR("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateCR("7123 4567"); // Invalid prefix 7 (old mobile)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateCR("8123 4567"); // Invalid prefix 8 (old mobile)
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateCR("612 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateCR("1234567");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateCR("6123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateCR("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateCR("612a 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateCR("6123@4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateCR("21234567").isValid).toBe(true); // Landline
    expect(validateCR("61234567").isValid).toBe(true); // Mobile
  });
});
