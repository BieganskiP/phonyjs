import { describe, test, expect } from "vitest";
import { validateLT } from "../src/validators/lt";

describe("validateLT - Lithuanian phone numbers", () => {
  test("should accept valid Lithuanian phone numbers", () => {
    expect(validateLT("5 123 4567").isValid).toBe(true);
    expect(validateLT("612 34567").isValid).toBe(true);
    expect(validateLT("81234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateLT("5 123 4567").isValid).toBe(true);
    expect(validateLT("5-123-4567").isValid).toBe(true);
    expect(validateLT("+370 5 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLT("1234567").isValid).toBe(false); // too short
    expect(validateLT("123456789").isValid).toBe(false); // too long
    expect(validateLT("123").isValid).toBe(false);
    expect(validateLT("").isValid).toBe(false);
  });

  test("should reject numbers starting with 0, 1, or 2", () => {
    expect(validateLT("01234567").isValid).toBe(false);
    expect(validateLT("11234567").isValid).toBe(false);
    expect(validateLT("21234567").isValid).toBe(false);
  });
});

