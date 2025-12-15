import { describe, test, expect } from "vitest";
import { validateEE } from "../src/validators/ee";

describe("validateEE - Estonian phone numbers", () => {
  test("should accept valid Estonian mobile numbers", () => {
    expect(validateEE("512 3456").isValid).toBe(true);
    expect(validateEE("51234567").isValid).toBe(true);
  });

  test("should accept valid Estonian landline numbers", () => {
    expect(validateEE("6 123 456").isValid).toBe(true);
    expect(validateEE("71234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateEE("6 123 456").isValid).toBe(true);
    expect(validateEE("6-123-456").isValid).toBe(true);
    expect(validateEE("+372 6 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateEE("123456").isValid).toBe(false); // too short
    expect(validateEE("123456789").isValid).toBe(false); // too long
    expect(validateEE("123").isValid).toBe(false);
    expect(validateEE("").isValid).toBe(false);
  });
});

