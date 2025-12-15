import { describe, test, expect } from "vitest";
import { validateMD } from "../../src/validators/europe/md";

describe("validateMD - Moldovan phone numbers", () => {
  test("should accept valid Moldovan mobile numbers", () => {
    expect(validateMD("069 123 456").isValid).toBe(true);
    expect(validateMD("079 123 456").isValid).toBe(true);
  });

  test("should accept valid Moldovan landline numbers", () => {
    expect(validateMD("22 123 456").isValid).toBe(true);
    expect(validateMD("231 23 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMD("22 123 456").isValid).toBe(true);
    expect(validateMD("22-123-456").isValid).toBe(true);
    expect(validateMD("+373 22 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMD("22 123 45").isValid).toBe(false); // too short
    expect(validateMD("22 123 4567").isValid).toBe(false); // too long
    expect(validateMD("123").isValid).toBe(false);
    expect(validateMD("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateMD("22123456").isValid).toBe(false);
  });
});

