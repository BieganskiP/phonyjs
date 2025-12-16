import { describe, test, expect } from "vitest";
import { validatePG } from "../../src/validators/oceania/pg";

describe("validatePG - Papua New Guinea phone numbers", () => {
  test("should accept valid Papua New Guinea phone numbers", () => {
    expect(validatePG("123 4567").isValid).toBe(true);
    expect(validatePG("9876543").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validatePG("123-4567").isValid).toBe(true);
    expect(validatePG("+675 123 4567").isValid).toBe(true);
    expect(validatePG("00675 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePG("123456").isValid).toBe(false); // too short
    expect(validatePG("12345678").isValid).toBe(false); // too long
    expect(validatePG("123").isValid).toBe(false);
    expect(validatePG("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validatePG("123 456a").isValid).toBe(false);
    expect(validatePG("abc def g").isValid).toBe(false);
  });
});

