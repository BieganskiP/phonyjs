import { describe, test, expect } from "vitest";
import { validateGB } from "../../src/validators/europe/gb";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGB - UK mobile phone numbers", () => {
  test("should accept valid UK mobile numbers", () => {
    expect(validateGB("07123456789").isValid).toBe(true);
    expect(validateGB("07912345678").isValid).toBe(true);
    expect(validateGB("07812345678").isValid).toBe(true);
    expect(validateGB("07512345678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGB("07123 456789").isValid).toBe(true);
    expect(validateGB("07123-456789").isValid).toBe(true);
    expect(validateGB("071 2345 6789").isValid).toBe(true);
    expect(validateGB("+44 7123 456789").isValid).toBe(true);
  });

  test("should accept UK landline numbers", () => {
    expect(validateGB("01123456789").isValid).toBe(true); // Manchester
    expect(validateGB("02012345678").isValid).toBe(true); // London
    expect(validateGB("03012345678").isValid).toBe(true); // Non-geographic
  });

  test("should reject invalid UK numbers", () => {
    const result = validateGB("08123456789");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateGB("071234567");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateGB("071234567890");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    const result = validateGB("abc-def-ghij");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should reject phone numbers with letters mixed in", () => {
    const result = validateGB("07123abc789");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should reject 070 numbers (personal numbers, not mobile)", () => {
    const result = validateGB("07012345678");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.PERSONAL_NUMBER_PREFIX);
  });
});
