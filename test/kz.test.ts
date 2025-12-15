import { describe, test, expect } from "vitest";
import { validateKZ } from "../src/validators/kz";

describe("validateKZ - Kazakhstani phone numbers", () => {
  test("should accept valid Kazakhstani mobile numbers", () => {
    expect(validateKZ("701 234 5678").isValid).toBe(true);
    expect(validateKZ("777 123 4567").isValid).toBe(true);
  });

  test("should accept valid Kazakhstani landline numbers", () => {
    expect(validateKZ("727 123 4567").isValid).toBe(true);
    expect(validateKZ("7172 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateKZ("727 123 4567").isValid).toBe(true);
    expect(validateKZ("727-123-4567").isValid).toBe(true);
    expect(validateKZ("+7 727 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKZ("727 123 456").isValid).toBe(false); // too short
    expect(validateKZ("727 123 45678").isValid).toBe(false); // too long
    expect(validateKZ("123").isValid).toBe(false);
    expect(validateKZ("").isValid).toBe(false);
  });

  test("should reject numbers not starting with 7", () => {
    expect(validateKZ("6271234567").isValid).toBe(false);
    expect(validateKZ("0123456789").isValid).toBe(false);
  });
});

