import { describe, test, expect } from "vitest";
import { validatePY } from "../../src/validators/south-america/py";
import { ErrorCodes } from "../../src/errorCodes";

describe("validatePY - Paraguayan phone numbers", () => {
  test("should accept valid Paraguayan mobile numbers", () => {
    expect(validatePY("981 123 456").isValid).toBe(true); // Mobile
    expect(validatePY("982 234 567").isValid).toBe(true); // Mobile
    expect(validatePY("983 345 678").isValid).toBe(true); // Mobile
    expect(validatePY("981123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Paraguayan landline numbers", () => {
    expect(validatePY("21 123 456").isValid).toBe(true); // Landline Asunción (8 digits)
    expect(validatePY("71 234 56").isValid).toBe(true); // Landline (7 digits)
    expect(validatePY("521 3456").isValid).toBe(true); // Landline (7 digits)
    expect(validatePY("21123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validatePY("595 981 123 456").isValid).toBe(true);
    expect(validatePY("+595 21 123 456").isValid).toBe(true);
    expect(validatePY("00595 982 234 567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePY("981-123-456").isValid).toBe(true);
    expect(validatePY("(21) 123-456").isValid).toBe(true);
    expect(validatePY("71.234.56").isValid).toBe(true);
    expect(validatePY("9 81 123 456").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 9 digits", () => {
    const result1 = validatePY("981 123 45"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePY("981 123 4567"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject landline numbers with wrong length", () => {
    const result1 = validatePY("21 123 4"); // 5 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validatePY("21 123 4567"); // 9 digits (but not starting with 9)
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validatePY("981 123 45a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validatePY("21 123 45#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });
});


