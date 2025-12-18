import { describe, test, expect } from "vitest";
import { validateSS } from "../../src/validators/africa/ss";

describe("validateSS - South Sudan phone numbers", () => {
  test("should accept valid South Sudan phone numbers", () => {
    expect(validateSS("91 123 4567").isValid).toBe(true);
    expect(validateSS("18 123 456").isValid).toBe(true);
  });

  test("should accept international format (+211)", () => {
    expect(validateSS("+211 91 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateSS("11 123 4567").isValid).toBe(false);
    expect(validateSS("").isValid).toBe(false);
  });
});

