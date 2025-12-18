import { describe, test, expect } from "vitest";
import { validateKN } from "../../src/validators/north-america/kn";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateKN - Saint Kitts and Nevis phone numbers", () => {
  test("should accept valid Saint Kitts and Nevis phone numbers", () => {
    expect(validateKN("869 123 4567").isValid).toBe(true);
    expect(validateKN("869 234 5678").isValid).toBe(true);
    expect(validateKN("869 345 6789").isValid).toBe(true);
    expect(validateKN("8691234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateKN("1 869 123 4567").isValid).toBe(true);
    expect(validateKN("+1 869 234 5678").isValid).toBe(true);
    expect(validateKN("001869 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKN("869-123-4567").isValid).toBe(true);
    expect(validateKN("869.123.4567").isValid).toBe(true);
    expect(validateKN("(869) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateKN("869 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateKN("869 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateKN("869 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateKN("869 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateKN("869 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateKN("869 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateKN("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateKN("234 5678").isValid).toBe(true);
    expect(validateKN("1234567").isValid).toBe(true); // Without formatting
  });
});
