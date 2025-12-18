import { describe, test, expect } from "vitest";
import { validateBZ } from "../../src/validators/north-america/bz";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateBZ - Belizean phone numbers", () => {
  test("should accept valid Belizean mobile numbers", () => {
    expect(validateBZ("612 3456").isValid).toBe(true); // Mobile
    expect(validateBZ("723 4567").isValid).toBe(true); // Mobile
    expect(validateBZ("6123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Belizean landline numbers", () => {
    expect(validateBZ("223 4567").isValid).toBe(true); // Belize City
    expect(validateBZ("334 5678").isValid).toBe(true); // Other area
    expect(validateBZ("445 6789").isValid).toBe(true); // Other area
    expect(validateBZ("556 7890").isValid).toBe(true); // Other area
    expect(validateBZ("823 4567").isValid).toBe(true); // Other area
    expect(validateBZ("2234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateBZ("501 612 3456").isValid).toBe(true);
    expect(validateBZ("+501 223 4567").isValid).toBe(true);
    expect(validateBZ("00501 723 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBZ("612-3456").isValid).toBe(true);
    expect(validateBZ("(223) 4567").isValid).toBe(true);
    expect(validateBZ("723.4567").isValid).toBe(true);
    expect(validateBZ("6 12 3456").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateBZ("123 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateBZ("923 4567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateBZ("612 345");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateBZ("123456");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateBZ("612 34567");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateBZ("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateBZ("612a456");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateBZ("612@3456");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateBZ("2123456").isValid).toBe(true); // Landline
    expect(validateBZ("3123456").isValid).toBe(true); // Landline
    expect(validateBZ("4123456").isValid).toBe(true); // Landline
    expect(validateBZ("5123456").isValid).toBe(true); // Landline
    expect(validateBZ("6123456").isValid).toBe(true); // Mobile
    expect(validateBZ("7123456").isValid).toBe(true); // Mobile
    expect(validateBZ("8123456").isValid).toBe(true); // Landline
  });
});


