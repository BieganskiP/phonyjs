import { describe, test, expect } from "vitest";
import { validateCL } from "../../src/validators/south-america/cl";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateCL - Chilean phone numbers", () => {
  test("should accept valid Chilean mobile numbers", () => {
    expect(validateCL("9 1234 5678").isValid).toBe(true); // Mobile
    expect(validateCL("9 8765 4321").isValid).toBe(true); // Mobile
    expect(validateCL("912345678").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Chilean landline numbers with 1-digit area codes", () => {
    expect(validateCL("2 1234 567").isValid).toBe(true); // Santiago (8 digits total)
    expect(validateCL("21234567").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Chilean landline numbers with 2-digit area codes", () => {
    expect(validateCL("32 1234 567").isValid).toBe(true); // Valparaíso (9 digits total)
    expect(validateCL("41 1234 567").isValid).toBe(true); // Puerto Montt
    expect(validateCL("321234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCL("56 9 1234 5678").isValid).toBe(true);
    expect(validateCL("+56 2 1234 567").isValid).toBe(true);
    expect(validateCL("0056 32 1234 567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCL("9-1234-5678").isValid).toBe(true);
    expect(validateCL("(2) 1234-567").isValid).toBe(true);
    expect(validateCL("32.1234.567").isValid).toBe(true);
    expect(validateCL("9 1234 5678").isValid).toBe(true);
  });

  test("should reject mobile numbers not exactly 9 digits", () => {
    const result1 = validateCL("9 1234 567"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateCL("9 1234 56789"); // 10 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject landline numbers with wrong length for area code", () => {
    const result1 = validateCL("2 1234 5678"); // 9 digits for 1-digit area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateCL("32 1234 5678"); // 10 digits for 2-digit area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid area codes", () => {
    const result1 = validateCL("1 1234 567"); // Invalid area code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateCL("19 1234 567"); // Invalid 2-digit area code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateCL("9 123 456");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateCL("1234567");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateCL("9 1234 567890");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateCL("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateCL("9 abc 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateCL("2#1234#567");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept all valid area codes", () => {
    // 1-digit area codes
    expect(validateCL("21234567").isValid).toBe(true); // Santiago
    
    // 2-digit area codes
    expect(validateCL("321234567").isValid).toBe(true); // Valparaíso
    expect(validateCL("331234567").isValid).toBe(true); // Viña del Mar
    expect(validateCL("411234567").isValid).toBe(true); // Puerto Montt
    expect(validateCL("511234567").isValid).toBe(true); // La Serena
    expect(validateCL("551234567").isValid).toBe(true); // Antofagasta
    expect(validateCL("611234567").isValid).toBe(true); // Punta Arenas
    expect(validateCL("711234567").isValid).toBe(true); // Talca
  });

  test("should accept mobile numbers", () => {
    expect(validateCL("912345678").isValid).toBe(true);
    expect(validateCL("987654321").isValid).toBe(true);
    expect(validateCL("911111111").isValid).toBe(true);
  });
});
