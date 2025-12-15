import { describe, test, expect } from "vitest";
import { validateAM } from "../../src/validators/europe/am";

describe("validateAM - Armenian phone numbers", () => {
  test("should accept valid Armenian mobile numbers", () => {
    expect(validateAM("077 123 456").isValid).toBe(true);
    expect(validateAM("091 123 456").isValid).toBe(true);
    expect(validateAM("099 123 456").isValid).toBe(true);
  });

  test("should accept Armenian landline numbers", () => {
    expect(validateAM("10 123 456").isValid).toBe(true); // Yerevan
    expect(validateAM("231 123 45").isValid).toBe(true); // Gyumri
    expect(validateAM("281 123 45").isValid).toBe(true); // Vanadzor
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAM("077 123 456").isValid).toBe(true);
    expect(validateAM("077-123-456").isValid).toBe(true);
    expect(validateAM("10 123 456").isValid).toBe(true);
  });

  test("should accept international format (+374)", () => {
    expect(validateAM("+374 77 123 456").isValid).toBe(true);
    expect(validateAM("+374 10 123 456").isValid).toBe(true);
    expect(validateAM("374 77 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAM("077 123 45").isValid).toBe(false);
    expect(validateAM("077 123 45678").isValid).toBe(false);
    expect(validateAM("").isValid).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateAM("070 123 456").isValid).toBe(false);
    expect(validateAM("092 123 456").isValid).toBe(false);
  });
});





