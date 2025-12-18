import { describe, test, expect } from "vitest";
import { validateGY } from "../../src/validators/south-america/gy";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGY - Guyanese phone numbers", () => {
  test("should accept valid Guyanese mobile numbers", () => {
    expect(validateGY("612 3456").isValid).toBe(true); // Mobile
    expect(validateGY("723 4567").isValid).toBe(true); // Mobile
    expect(validateGY("634 5678").isValid).toBe(true); // Mobile
    expect(validateGY("6123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Guyanese landline numbers", () => {
    expect(validateGY("223 4567").isValid).toBe(true); // Landline
    expect(validateGY("334 5678").isValid).toBe(true); // Landline
    expect(validateGY("445 6789").isValid).toBe(true); // Landline
    expect(validateGY("556 7890").isValid).toBe(true); // Landline
    expect(validateGY("2234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGY("592 612 3456").isValid).toBe(true);
    expect(validateGY("+592 223 4567").isValid).toBe(true);
    expect(validateGY("00592 723 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGY("612-3456").isValid).toBe(true);
    expect(validateGY("(223) 4567").isValid).toBe(true);
    expect(validateGY("723.4567").isValid).toBe(true);
    expect(validateGY("6 12 3456").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateGY("112 3456"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateGY("812 3456"); // Invalid prefix 8
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateGY("912 3456"); // Invalid prefix 9
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateGY("612 345");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateGY("612 34567");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateGY("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGY("612 345a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGY("612 345#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateGY("2123456").isValid).toBe(true); // Landline
    expect(validateGY("3123456").isValid).toBe(true); // Landline
    expect(validateGY("4123456").isValid).toBe(true); // Landline
    expect(validateGY("5123456").isValid).toBe(true); // Landline
    expect(validateGY("6123456").isValid).toBe(true); // Mobile
    expect(validateGY("7123456").isValid).toBe(true); // Mobile
  });
});


