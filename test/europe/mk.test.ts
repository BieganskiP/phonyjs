import { describe, test, expect } from "vitest";
import { validateMK } from "../../src/validators/europe/mk";

describe("validateMK - North Macedonian phone numbers", () => {
  test("should accept valid North Macedonian mobile numbers", () => {
    expect(validateMK("071 234 567").isValid).toBe(true);
    expect(validateMK("072 234 567").isValid).toBe(true);
  });

  test("should accept valid North Macedonian landline numbers", () => {
    expect(validateMK("02 123 456").isValid).toBe(true);
    expect(validateMK("031 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMK("02 123 456").isValid).toBe(true);
    expect(validateMK("02-123-456").isValid).toBe(true);
    expect(validateMK("+389 2 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMK("02 123 45").isValid).toBe(false); // too short
    expect(validateMK("02 123 4567").isValid).toBe(false); // too long
    expect(validateMK("123").isValid).toBe(false);
    expect(validateMK("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateMK("2123456").isValid).toBe(false);
  });
});

