import { describe, test, expect } from "vitest";
import { validateLB } from "../../src/validators/asia/lb";

describe("validateLB - Lebanese phone numbers", () => {
  test("should accept valid Lebanese mobile numbers", () => {
    expect(validateLB("3 123 456").isValid).toBe(true); // Alfa
    expect(validateLB("7 123 4567").isValid).toBe(true); // Touch
    expect(validateLB("8 123 4567").isValid).toBe(true); // Touch
    expect(validateLB("31234567").isValid).toBe(true); // no formatting
  });

  test("should accept Lebanese landline numbers", () => {
    expect(validateLB("1 123 456").isValid).toBe(true); // Beirut
    expect(validateLB("4 123 456").isValid).toBe(true); // South Lebanon
    expect(validateLB("1123456").isValid).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateLB("3 123 456").isValid).toBe(true);
    expect(validateLB("3-123-456").isValid).toBe(true);
    expect(validateLB("1 123 456").isValid).toBe(true);
  });

  test("should accept international format (+961)", () => {
    expect(validateLB("+961 3 123 456").isValid).toBe(true); // mobile
    expect(validateLB("+961 1 123 456").isValid).toBe(true); // landline
    expect(validateLB("961 7 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLB("3 123 45").isValid).toBe(false); // too short
    expect(validateLB("3 123 456789").isValid).toBe(false); // too long
    expect(validateLB("31").isValid).toBe(false);
    expect(validateLB("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateLB("2 123 4567").isValid).toBe(false); // 2 is not a valid prefix
  });
});





