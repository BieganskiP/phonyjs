import { describe, test, expect } from "vitest";
import { validateVC } from "../../src/validators/north-america/vc";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateVC - Saint Vincent and the Grenadines phone numbers", () => {
  test("should accept valid Saint Vincent and the Grenadines phone numbers", () => {
    expect(validateVC("784 123 4567").isValid).toBe(true);
    expect(validateVC("784 234 5678").isValid).toBe(true);
    expect(validateVC("784 345 6789").isValid).toBe(true);
    expect(validateVC("7841234567").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateVC("1 784 123 4567").isValid).toBe(true);
    expect(validateVC("+1 784 234 5678").isValid).toBe(true);
    expect(validateVC("001784 345 6789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateVC("784-123-4567").isValid).toBe(true);
    expect(validateVC("784.123.4567").isValid).toBe(true);
    expect(validateVC("(784) 123-4567").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateVC("784 123 456"); // 6 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateVC("784 12345"); // 5 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateVC("784 123 45678"); // 8 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateVC("784 1234 56789"); // 9 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateVC("784 123 456a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateVC("784 123 456#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without area code (NANP format)", () => {
    expect(validateVC("123 4567").isValid).toBe(true); // 7 digits without area code
    expect(validateVC("234 5678").isValid).toBe(true);
    expect(validateVC("1234567").isValid).toBe(true); // Without formatting
  });
});
