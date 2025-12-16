import { describe, test, expect } from "vitest";
import { validateVU } from "../../src/validators/oceania/vu";

describe("validateVU - Vanuatu phone numbers", () => {
  test("should accept valid Vanuatu landline numbers", () => {
    expect(validateVU("22 123").isValid).toBe(true);
    expect(validateVU("22 456").isValid).toBe(true);
  });

  test("should accept valid Vanuatu mobile numbers", () => {
    expect(validateVU("77 123").isValid).toBe(true);
    expect(validateVU("77 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateVU("22-123").isValid).toBe(true);
    expect(validateVU("+678 22 123").isValid).toBe(true);
    expect(validateVU("00678 22 123").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateVU("22 12").isValid).toBe(false); // too short
    expect(validateVU("22 1234").isValid).toBe(false); // too long
    expect(validateVU("123").isValid).toBe(false);
    expect(validateVU("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid prefixes", () => {
    expect(validateVU("11 123").isValid).toBe(false); // invalid prefix
    expect(validateVU("33 123").isValid).toBe(false); // invalid prefix
  });
});

