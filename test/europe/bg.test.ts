import { describe, test, expect } from "vitest";
import { validateBG } from "../../src/validators/europe/bg";

describe("validateBG - Bulgarian phone numbers", () => {
  test("should accept valid Bulgarian mobile numbers", () => {
    expect(validateBG("088 123 4567").isValid).toBe(true);
    expect(validateBG("099 123 4567").isValid).toBe(true);
  });

  test("should accept valid Bulgarian landline numbers", () => {
    expect(validateBG("02 123 4567").isValid).toBe(true);
    expect(validateBG("032 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateBG("02 123 4567").isValid).toBe(true);
    expect(validateBG("02-123-4567").isValid).toBe(true);
    expect(validateBG("+359 2 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBG("02 123 456").isValid).toBe(false); // too short
    expect(validateBG("088 123 45678").isValid).toBe(false); // too long
    expect(validateBG("123").isValid).toBe(false);
    expect(validateBG("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateBG("21234567").isValid).toBe(false);
  });
});

