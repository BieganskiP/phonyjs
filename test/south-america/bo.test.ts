import { describe, test, expect } from "vitest";
import { validateBO } from "../../src/validators/south-america/bo";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateBO - Bolivian phone numbers", () => {
  test("should accept valid Bolivian mobile numbers", () => {
    expect(validateBO("6123 4567").isValid).toBe(true); // Mobile
    expect(validateBO("7234 5678").isValid).toBe(true); // Mobile
    expect(validateBO("7345 6789").isValid).toBe(true); // Mobile
    expect(validateBO("61234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Bolivian landline numbers", () => {
    expect(validateBO("2234 5678").isValid).toBe(true); // Landline
    expect(validateBO("3345 6789").isValid).toBe(true); // Landline
    expect(validateBO("4456 7890").isValid).toBe(true); // Landline
    expect(validateBO("22345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateBO("591 6123 4567").isValid).toBe(true);
    expect(validateBO("+591 2234 5678").isValid).toBe(true);
    expect(validateBO("00591 7234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBO("6123-4567").isValid).toBe(true);
    expect(validateBO("(2234) 5678").isValid).toBe(true);
    expect(validateBO("7234.5678").isValid).toBe(true);
    expect(validateBO("6 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateBO("1123 4567"); // Invalid prefix 1
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateBO("5123 4567"); // Invalid prefix 5
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateBO("8123 4567"); // Invalid prefix 8
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateBO("9123 4567"); // Invalid prefix 9
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateBO("612 456");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateBO("6123 45678");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateBO("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateBO("612a 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateBO("6123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateBO("21234567").isValid).toBe(true); // Landline
    expect(validateBO("31234567").isValid).toBe(true); // Landline
    expect(validateBO("41234567").isValid).toBe(true); // Landline
    expect(validateBO("61234567").isValid).toBe(true); // Mobile
    expect(validateBO("71234567").isValid).toBe(true); // Mobile
  });
});


