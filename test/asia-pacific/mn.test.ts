import { describe, test, expect } from "vitest";
import { validateMN } from "../../src/validators/asia-pacific/mn";

describe("validateMN - Mongolian phone numbers", () => {
  test("should accept valid Mongolian mobile numbers", () => {
    expect(validateMN("91 123456").isValid).toBe(true);
    expect(validateMN("99 987654").isValid).toBe(true);
  });

  test("should accept valid Mongolian landline numbers", () => {
    expect(validateMN("011 23456").isValid).toBe(true);
    expect(validateMN("021 34567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMN("91-123-456").isValid).toBe(true);
    expect(validateMN("+976 91 123456").isValid).toBe(true);
    expect(validateMN("00976 91 123456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMN("91 12345").isValid).toBe(false); // too short
    expect(validateMN("91 1234567").isValid).toBe(false); // too long
    expect(validateMN("123").isValid).toBe(false);
    expect(validateMN("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid format", () => {
    expect(validateMN("81 123456").isValid).toBe(false); // invalid prefix
    expect(validateMN("111 23456").isValid).toBe(false); // invalid format
  });
});

