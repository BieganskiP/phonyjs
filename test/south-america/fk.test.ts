import { describe, test, expect } from "vitest";
import { validateFK } from "../../src/validators/south-america/fk";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateFK - Falkland Islands phone numbers", () => {
  test("should accept valid Falkland Islands phone numbers", () => {
    expect(validateFK("500 12345").isValid).toBe(true);
    expect(validateFK("500 23456").isValid).toBe(true);
    expect(validateFK("500 34567").isValid).toBe(true);
    expect(validateFK("50012345").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateFK("+500 12345").isValid).toBe(true);
    expect(validateFK("00500 12345").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateFK("500-12345").isValid).toBe(true);
    expect(validateFK("(500) 12345").isValid).toBe(true);
    expect(validateFK("500.12345").isValid).toBe(true);
    expect(validateFK("5 00 12345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateFK("500 1234");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateFK("500 123456");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateFK("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateFK("500 1234a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateFK("500 1234#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code (local format)", () => {
    expect(validateFK("12345").isValid).toBe(true); // Local format
  });
});


