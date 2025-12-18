import { describe, test, expect } from "vitest";
import { validateGP } from "../../src/validators/north-america/gp";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGP - Guadeloupe phone numbers", () => {
  test("should accept valid Guadeloupe mobile numbers", () => {
    expect(validateGP("590 690 12 34 56").isValid).toBe(true);
    expect(validateGP("590 691 23 45 67").isValid).toBe(true);
    expect(validateGP("590 692 34 56 78").isValid).toBe(true);
    expect(validateGP("590690123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Guadeloupe landline numbers", () => {
    expect(validateGP("590 590 12 34 56").isValid).toBe(true);
    expect(validateGP("590 591 23 45 67").isValid).toBe(true);
    expect(validateGP("590 592 34 56 78").isValid).toBe(true);
    expect(validateGP("590590123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGP("+590 690 12 34 56").isValid).toBe(true);
    expect(validateGP("00590 590 12 34 56").isValid).toBe(true);
    expect(validateGP("590 691234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGP("590-690-12-34-56").isValid).toBe(true);
    expect(validateGP("590.690.12.34.56").isValid).toBe(true);
    expect(validateGP("590 690 123456").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateGP("590 690 12"); // 8 digits total, 5 after removing country code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateGP("69012345"); // 8 digits without country code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateGP("590 690 12 34 567"); // 10 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateGP("590 690 1234 56789"); // 11 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject numbers with invalid prefix", () => {
    const result1 = validateGP("590 490 12 34 56"); // Invalid prefix 4
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateGP("590 790 12 34 56"); // Invalid prefix 7
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGP("590 690 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGP("590 690 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code (local format)", () => {
    expect(validateGP("690 12 34 56").isValid).toBe(true); // 9 digits mobile
    expect(validateGP("590 12 34 56").isValid).toBe(true); // 9 digits landline
    expect(validateGP("690123456").isValid).toBe(true); // Without formatting
  });
});
