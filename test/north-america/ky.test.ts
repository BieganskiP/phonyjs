import { describe, test, expect } from "vitest";
import { validateKY } from "../../src/validators/north-america/ky";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateKY - Cayman Islands phone numbers", () => {
  test("should accept valid Cayman Islands phone numbers", () => {
    expect(validateKY("345 123 4567").isValid).toBe(true);
    expect(validateKY("345 234 5678").isValid).toBe(true);
    expect(validateKY("345 345 6789").isValid).toBe(true);
    expect(validateKY("3451234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateKY("1 345 123 4567").isValid).toBe(true);
    expect(validateKY("+1 345 234 5678").isValid).toBe(true);
    expect(validateKY("001345 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKY("345-123-4567").isValid).toBe(true);
    expect(validateKY("345.123.4567").isValid).toBe(true);
    expect(validateKY("(345) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateKY("345 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateKY("345 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateKY("345 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateKY("345 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateKY("345 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateKY("345 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateKY("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateKY("234 5678").isValid).toBe(true);
    expect(validateKY("1234567").isValid).toBe(true); // Without formatting
  });
});


