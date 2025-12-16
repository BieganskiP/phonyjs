import { describe, test, expect } from "vitest";
import { validateBT } from "../../src/validators/asia-pacific/bt";

describe("validateBT - Bhutan phone numbers", () => {
  test("should accept valid Bhutan mobile numbers", () => {
    expect(validateBT("171 23456").isValid).toBe(true);
    expect(validateBT("172 34567").isValid).toBe(true);
  });

  test("should accept valid Bhutan landline numbers", () => {
    expect(validateBT("02 123456").isValid).toBe(true);
    expect(validateBT("03 234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateBT("171-234-56").isValid).toBe(true);
    expect(validateBT("+975 171 23456").isValid).toBe(true);
    expect(validateBT("00975 171 23456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBT("171 2345").isValid).toBe(false); // too short
    expect(validateBT("171 234567").isValid).toBe(false); // too long
    expect(validateBT("123").isValid).toBe(false);
    expect(validateBT("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid format", () => {
    expect(validateBT("181 23456").isValid).toBe(false); // invalid mobile prefix
    expect(validateBT("11 123456").isValid).toBe(false); // invalid format
  });
});

