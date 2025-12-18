import { describe, test, expect } from "vitest";
import { validateMF } from "../../src/validators/north-america/mf";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateMF - Saint-Martin (French part) phone numbers", () => {
  test("should accept valid Saint-Martin mobile numbers", () => {
    expect(validateMF("590 690 12 34 56").isValid).toBe(true);
    expect(validateMF("590 691 23 45 67").isValid).toBe(true);
    expect(validateMF("590 692 34 56 78").isValid).toBe(true);
    expect(validateMF("590690123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Saint-Martin landline numbers", () => {
    expect(validateMF("590 590 12 34 56").isValid).toBe(true);
    expect(validateMF("590 591 23 45 67").isValid).toBe(true);
    expect(validateMF("590 592 34 56 78").isValid).toBe(true);
    expect(validateMF("590590123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateMF("+590 690 12 34 56").isValid).toBe(true);
    expect(validateMF("00590 590 12 34 56").isValid).toBe(true);
    expect(validateMF("590 691234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMF("590-690-12-34-56").isValid).toBe(true);
    expect(validateMF("590.690.12.34.56").isValid).toBe(true);
    expect(validateMF("590 690 123456").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateMF("590 690 12"); // 8 digits total, 5 after removing country code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateMF("69012345"); // 8 digits without country code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateMF("590 690 12 34 567"); // 10 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateMF("590 690 1234 56789"); // 11 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject numbers with invalid prefix", () => {
    const result1 = validateMF("590 490 12 34 56"); // Invalid prefix 4
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateMF("590 790 12 34 56"); // Invalid prefix 7
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateMF("590 690 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateMF("590 690 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code (local format)", () => {
    expect(validateMF("690 12 34 56").isValid).toBe(true); // 9 digits mobile
    expect(validateMF("590 12 34 56").isValid).toBe(true); // 9 digits landline
    expect(validateMF("690123456").isValid).toBe(true); // Without formatting
  });
});
