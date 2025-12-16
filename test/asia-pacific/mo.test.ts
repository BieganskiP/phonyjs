import { describe, test, expect } from "vitest";
import { validateMO } from "../../src/validators/asia-pacific/mo";

describe("validateMO - Macau phone numbers", () => {
  test("should accept valid Macau phone numbers", () => {
    expect(validateMO("1234 5678").isValid).toBe(true);
    expect(validateMO("98765432").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMO("1234-5678").isValid).toBe(true);
    expect(validateMO("+853 1234 5678").isValid).toBe(true);
    expect(validateMO("00853 1234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMO("1234567").isValid).toBe(false); // too short
    expect(validateMO("123456789").isValid).toBe(false); // too long
    expect(validateMO("123").isValid).toBe(false);
    expect(validateMO("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateMO("1234 567a").isValid).toBe(false);
    expect(validateMO("abc def gh").isValid).toBe(false);
  });
});

