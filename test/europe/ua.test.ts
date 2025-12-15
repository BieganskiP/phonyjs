import { describe, test, expect } from "vitest";
import { validateUA } from "../../src/validators/europe/ua";

describe("validateUA - Ukrainian phone numbers", () => {
  test("should accept valid Ukrainian mobile numbers", () => {
    expect(validateUA("050 123 4567").isValid).toBe(true);
    expect(validateUA("063 123 4567").isValid).toBe(true);
    expect(validateUA("099 123 4567").isValid).toBe(true);
  });

  test("should accept valid Ukrainian landline numbers", () => {
    expect(validateUA("044 123 4567").isValid).toBe(true);
    expect(validateUA("032 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateUA("044 123 4567").isValid).toBe(true);
    expect(validateUA("044-123-4567").isValid).toBe(true);
    expect(validateUA("+380 44 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateUA("044 123 456").isValid).toBe(false); // too short
    expect(validateUA("044 123 45678").isValid).toBe(false); // too long
    expect(validateUA("123").isValid).toBe(false);
    expect(validateUA("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateUA("441234567").isValid).toBe(false);
  });
});

