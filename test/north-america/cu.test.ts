import { describe, test, expect } from "vitest";
import { validateCU } from "../../src/validators/north-america/cu";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateCU - Cuban phone numbers", () => {
  test("should accept valid Cuban mobile numbers", () => {
    expect(validateCU("5123 4567").isValid).toBe(true); // Mobile (5)
    expect(validateCU("5234 5678").isValid).toBe(true); // Mobile
    expect(validateCU("51234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Cuban landline numbers", () => {
    expect(validateCU("2123 4567").isValid).toBe(true); // Landline (2)
    expect(validateCU("3234 5678").isValid).toBe(true); // Landline (3)
    expect(validateCU("4345 6789").isValid).toBe(true); // Landline (4)
    expect(validateCU("7456 7890").isValid).toBe(true); // Landline (7)
    expect(validateCU("21234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCU("53 5123 4567").isValid).toBe(true);
    expect(validateCU("+53 2234 5678").isValid).toBe(true);
    expect(validateCU("0053 3345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCU("5123-4567").isValid).toBe(true);
    expect(validateCU("2234.5678").isValid).toBe(true);
    expect(validateCU("(53) 3345-6789").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateCU("512 4567"); // 7 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateCU("51234"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateCU("5123 45678"); // 9 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateCU("51234 56789"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid first digit", () => {
    const result1 = validateCU("1123 4567");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateCU("6234 5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateCU("0123 4567");
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result4 = validateCU("8123 4567");
    expect(result4.isValid).toBe(false);
    expect(result4.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateCU("5123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateCU("2234 567#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid prefixes", () => {
    expect(validateCU("21234567").isValid).toBe(true); // Landline (2)
    expect(validateCU("31234567").isValid).toBe(true); // Landline (3)
    expect(validateCU("41234567").isValid).toBe(true); // Landline (4)
    expect(validateCU("51234567").isValid).toBe(true); // Mobile (5)
    expect(validateCU("71234567").isValid).toBe(true); // Landline (7)
  });
});


