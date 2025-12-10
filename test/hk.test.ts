import { describe, test, expect } from "vitest";
import { validateHK } from "../src/validators/hk";

describe("validateHK - Hong Kong phone numbers", () => {
  test("should accept valid Hong Kong mobile numbers", () => {
    expect(validateHK("9123 4567").isValid).toBe(true);
    expect(validateHK("6123 4567").isValid).toBe(true);
    expect(validateHK("5123 4567").isValid).toBe(true);
  });

  test("should accept Hong Kong landline numbers", () => {
    expect(validateHK("2123 4567").isValid).toBe(true);
    expect(validateHK("3123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateHK("9123 4567").isValid).toBe(true);
    expect(validateHK("9123-4567").isValid).toBe(true);
    expect(validateHK("2123 4567").isValid).toBe(true);
  });

  test("should accept international format (+852)", () => {
    expect(validateHK("+852 9123 4567").isValid).toBe(true);
    expect(validateHK("+852 2123 4567").isValid).toBe(true);
    expect(validateHK("852 9123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateHK("9123 456").isValid).toBe(false);
    expect(validateHK("9123 45678").isValid).toBe(false);
    expect(validateHK("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateHK("0123 4567").isValid).toBe(false);
    expect(validateHK("1123 4567").isValid).toBe(false);
  });
});





