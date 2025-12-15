import { describe, test, expect } from "vitest";
import { validateXK } from "../src/validators/xk";

describe("validateXK - Kosovan phone numbers", () => {
  test("should accept valid Kosovan mobile numbers", () => {
    expect(validateXK("044 123 456").isValid).toBe(true);
    expect(validateXK("045 123 456").isValid).toBe(true);
  });

  test("should accept valid Kosovan landline numbers", () => {
    expect(validateXK("38 123 456").isValid).toBe(true);
    expect(validateXK("029 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateXK("38 123 456").isValid).toBe(true);
    expect(validateXK("38-123-456").isValid).toBe(true);
    expect(validateXK("+383 38 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateXK("38 123 45").isValid).toBe(false); // too short
    expect(validateXK("38 123 4567").isValid).toBe(false); // too long
    expect(validateXK("123").isValid).toBe(false);
    expect(validateXK("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateXK("38123456").isValid).toBe(false);
  });
});

