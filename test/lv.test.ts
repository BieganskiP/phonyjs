import { describe, test, expect } from "vitest";
import { validateLV } from "../src/validators/lv";

describe("validateLV - Latvian phone numbers", () => {
  test("should accept valid Latvian mobile numbers", () => {
    expect(validateLV("29123456").isValid).toBe(true);
    expect(validateLV("21234567").isValid).toBe(true);
  });

  test("should accept valid Latvian landline numbers", () => {
    expect(validateLV("67 123 456").isValid).toBe(true);
    expect(validateLV("71234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateLV("67 123 456").isValid).toBe(true);
    expect(validateLV("67-123-456").isValid).toBe(true);
    expect(validateLV("+371 67 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLV("1234567").isValid).toBe(false); // too short
    expect(validateLV("123456789").isValid).toBe(false); // too long
    expect(validateLV("123").isValid).toBe(false);
    expect(validateLV("").isValid).toBe(false);
  });

  test("should reject numbers not starting with 2, 6, or 7", () => {
    expect(validateLV("01234567").isValid).toBe(false);
    expect(validateLV("11234567").isValid).toBe(false);
  });
});

