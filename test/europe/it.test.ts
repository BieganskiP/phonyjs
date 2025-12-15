import { describe, test, expect } from "vitest";
import { validateIT } from "../../src/validators/europe/it";

describe("validateIT - Italian phone numbers", () => {
  test("should accept valid Italian mobile numbers", () => {
    expect(validateIT("3201234567").isValid).toBe(true);
    expect(validateIT("3391234567").isValid).toBe(true);
    expect(validateIT("3451234567").isValid).toBe(true);
    expect(validateIT("3801234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIT("320 123 4567").isValid).toBe(true);
    expect(validateIT("320-123-4567").isValid).toBe(true);
    expect(validateIT("320 1234 567").isValid).toBe(true);
  });

  test("should accept international format (+39)", () => {
    expect(validateIT("+39 320 123 4567").isValid).toBe(true);
    expect(validateIT("+393201234567").isValid).toBe(true);
    expect(validateIT("39 320 123 4567").isValid).toBe(true);
  });

  test("should accept Italian landline numbers", () => {
    expect(validateIT("0212345678").isValid).toBe(true); // landline (Milan)
    expect(validateIT("0612345678").isValid).toBe(true); // landline (Rome)
    expect(validateIT("05512345678").isValid).toBe(true); // landline (Florence)
  });

  test("should reject invalid Italian numbers", () => {
    expect(validateIT("2123456789").isValid).toBe(false); // missing leading 0
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIT("320123456").isValid).toBe(false); // too short
    expect(validateIT("32012345678").isValid).toBe(false); // too long
    expect(validateIT("320").isValid).toBe(false);
    expect(validateIT("").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateIT("320123456a").isValid).toBe(false);
    expect(validateIT("a201234567").isValid).toBe(false);
  });
});





