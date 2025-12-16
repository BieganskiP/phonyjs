import { describe, test, expect } from "vitest";
import { validateSB } from "../../src/validators/oceania/sb";

describe("validateSB - Solomon Islands phone numbers", () => {
  test("should accept valid Solomon Islands phone numbers", () => {
    expect(validateSB("12345").isValid).toBe(true);
    expect(validateSB("123456").isValid).toBe(true);
    expect(validateSB("123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSB("123-45").isValid).toBe(true);
    expect(validateSB("+677 12345").isValid).toBe(true);
    expect(validateSB("00677 12345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSB("1234").isValid).toBe(false); // too short
    expect(validateSB("12345678").isValid).toBe(false); // too long
    expect(validateSB("123").isValid).toBe(false);
    expect(validateSB("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateSB("1234a").isValid).toBe(false);
    expect(validateSB("abc de").isValid).toBe(false);
  });
});

