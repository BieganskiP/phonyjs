import { describe, test, expect } from "vitest";
import { validateAZ } from "../src/validators/az";

describe("validateAZ - Azerbaijani phone numbers", () => {
  test("should accept valid Azerbaijani mobile numbers", () => {
    expect(validateAZ("050 123 4567").isValid).toBe(true);
    expect(validateAZ("070 123 4567").isValid).toBe(true);
    expect(validateAZ("099 123 4567").isValid).toBe(true);
  });

  test("should accept valid Azerbaijani landline numbers", () => {
    expect(validateAZ("12 123 4567").isValid).toBe(true);
    expect(validateAZ("141 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateAZ("12 123 4567").isValid).toBe(true);
    expect(validateAZ("12-123-4567").isValid).toBe(true);
    expect(validateAZ("+994 12 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAZ("12 123 456").isValid).toBe(false); // too short
    expect(validateAZ("12 123 45678").isValid).toBe(false); // too long
    expect(validateAZ("123").isValid).toBe(false);
    expect(validateAZ("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateAZ("121234567").isValid).toBe(false);
  });
});

