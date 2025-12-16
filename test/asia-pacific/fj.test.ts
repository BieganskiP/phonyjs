import { describe, test, expect } from "vitest";
import { validateFJ } from "../../src/validators/asia-pacific/fj";

describe("validateFJ - Fijian phone numbers", () => {
  test("should accept valid Fijian phone numbers", () => {
    expect(validateFJ("123 4567").isValid).toBe(true);
    expect(validateFJ("987 6543").isValid).toBe(true);
    expect(validateFJ("555 1234").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateFJ("123 4567").isValid).toBe(true);
    expect(validateFJ("123-4567").isValid).toBe(true);
    expect(validateFJ("+679 123 4567").isValid).toBe(true);
    expect(validateFJ("00679 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateFJ("123 456").isValid).toBe(false); // too short
    expect(validateFJ("123 45678").isValid).toBe(false); // too long
    expect(validateFJ("123").isValid).toBe(false);
    expect(validateFJ("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateFJ("123 456a").isValid).toBe(false);
    expect(validateFJ("abc defg").isValid).toBe(false);
  });
});

