import { describe, test, expect } from "vitest";
import { validateSR } from "../../src/validators/south-america/sr";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateSR - Surinamese phone numbers", () => {
  test("should accept valid Surinamese mobile numbers", () => {
    expect(validateSR("712 3456").isValid).toBe(true); // Mobile
    expect(validateSR("823 4567").isValid).toBe(true); // Mobile
    expect(validateSR("734 5678").isValid).toBe(true); // Mobile
    expect(validateSR("7123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Surinamese landline numbers", () => {
    expect(validateSR("423 4567").isValid).toBe(true); // Landline
    expect(validateSR("534 5678").isValid).toBe(true); // Landline
    expect(validateSR("645 6789").isValid).toBe(true); // Landline
    expect(validateSR("4234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateSR("597 712 3456").isValid).toBe(true);
    expect(validateSR("+597 423 4567").isValid).toBe(true);
    expect(validateSR("00597 823 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSR("712-3456").isValid).toBe(true);
    expect(validateSR("(423) 4567").isValid).toBe(true);
    expect(validateSR("534.5678").isValid).toBe(true);
    expect(validateSR("7 12 3456").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateSR("112 3456"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateSR("212 3456"); // Invalid prefix 2
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateSR("912 3456"); // Invalid prefix 9
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateSR("712 345");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateSR("712 34567");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateSR("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateSR("712 345a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateSR("712 345#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateSR("4123456").isValid).toBe(true); // Landline
    expect(validateSR("5123456").isValid).toBe(true); // Landline
    expect(validateSR("6123456").isValid).toBe(true); // Landline
    expect(validateSR("7123456").isValid).toBe(true); // Mobile
    expect(validateSR("8123456").isValid).toBe(true); // Mobile
  });
});


