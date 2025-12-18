import { describe, test, expect } from "vitest";
import { validateGF } from "../../src/validators/south-america/gf";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateGF - French Guiana phone numbers", () => {
  test("should accept valid French Guiana mobile numbers", () => {
    expect(validateGF("594 694 12 34 56").isValid).toBe(true); // Mobile
    expect(validateGF("594 612 34 56 78").isValid).toBe(true); // Mobile
    expect(validateGF("594 678 90 12 34").isValid).toBe(true); // Mobile
    expect(validateGF("594694123456").isValid).toBe(true); // Without formatting
  });

  test("should accept valid French Guiana landline numbers", () => {
    expect(validateGF("594 594 12 34 56").isValid).toBe(true); // Landline
    expect(validateGF("594 512 34 56 78").isValid).toBe(true); // Landline
    expect(validateGF("594 578 90 12 34").isValid).toBe(true); // Landline
    expect(validateGF("594594123456").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateGF("+594 694 12 34 56").isValid).toBe(true);
    expect(validateGF("00594 594 12 34 56").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGF("594-694-12-34-56").isValid).toBe(true);
    expect(validateGF("(594) 594-12-34-56").isValid).toBe(true);
    expect(validateGF("594.694.12.34.56").isValid).toBe(true);
    expect(validateGF("594 694 12 34 56").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid prefix", () => {
    const result1 = validateGF("594 412 34 56 78"); // Invalid prefix 4
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result2 = validateGF("594 712 34 56 78"); // Invalid prefix 7
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_PREFIX);

    const result3 = validateGF("594 812 34 56 78"); // Invalid prefix 8
    expect(result3.isValid).toBe(false);
    expect(result3.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort = validateGF("594 694 12 34");
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateGF("594 694 12 34 567");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateGF("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateGF("594 694 12 34 5a");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateGF("594 694 12 34 5#");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept numbers without country code (local format)", () => {
    expect(validateGF("694 12 34 56").isValid).toBe(true); // Mobile local
    expect(validateGF("594 12 34 56").isValid).toBe(true); // Landline local
  });
});


