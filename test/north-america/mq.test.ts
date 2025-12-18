import { describe, test, expect } from "vitest";
import { validateMQ } from "../../src/validators/north-america/mq";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateMQ - Martinique phone numbers", () => {
  test("should accept valid Martinique mobile numbers", () => {
    expect(validateMQ("596 696 12 34 56").isValid).toBe(true);
    expect(validateMQ("596 697 23 45 67").isValid).toBe(true);
    expect(validateMQ("596 698 34 56 78").isValid).toBe(true);
    expect(validateMQ("596696123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Martinique landline numbers", () => {
    expect(validateMQ("596 596 12 34 56").isValid).toBe(true);
    expect(validateMQ("596 597 23 45 67").isValid).toBe(true);
    expect(validateMQ("596 598 34 56 78").isValid).toBe(true);
    expect(validateMQ("596596123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateMQ("+596 696 12 34 56").isValid).toBe(true);
    expect(validateMQ("00596 596 12 34 56").isValid).toBe(true);
    expect(validateMQ("596 697234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMQ("596-696-12-34-56").isValid).toBe(true);
    expect(validateMQ("596.696.12.34.56").isValid).toBe(true);
    expect(validateMQ("596 696 123456").isValid).toBe(true);
  });

  test("should reject numbers that are too short", () => {
    const result1 = validateMQ("596 696 12"); // 8 digits total, 5 after removing country code
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const result2 = validateMQ("69612345"); // 8 digits without country code
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject numbers that are too long", () => {
    const result1 = validateMQ("596 696 12 34 567"); // 10 digits
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.TOO_LONG);

    const result2 = validateMQ("596 696 1234 56789"); // 11 digits
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.TOO_LONG);
  });

  test("should reject numbers with invalid prefix", () => {
    const result1 = validateMQ("596 496 12 34 56"); // Invalid prefix 4
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateMQ("596 796 12 34 56"); // Invalid prefix 7
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateMQ("596 696 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateMQ("596 696 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code (local format)", () => {
    expect(validateMQ("696 12 34 56").isValid).toBe(true); // 9 digits mobile
    expect(validateMQ("596 12 34 56").isValid).toBe(true); // 9 digits landline
    expect(validateMQ("696123456").isValid).toBe(true); // Without formatting
  });
});
