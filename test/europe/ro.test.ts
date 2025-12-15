import { describe, test, expect } from "vitest";
import { validateRO } from "../../src/validators/europe/ro";

describe("validateRO - Romanian phone numbers", () => {
  test("should accept valid Romanian mobile numbers", () => {
    expect(validateRO("0722 123 456").isValid).toBe(true);
    expect(validateRO("0745 123 456").isValid).toBe(true);
    expect(validateRO("0789 123 456").isValid).toBe(true);
  });

  test("should accept Romanian landline numbers", () => {
    expect(validateRO("021 234 5678").isValid).toBe(true); // Bucharest
    expect(validateRO("0264 123 456").isValid).toBe(true); // Cluj
    expect(validateRO("0256 234 567").isValid).toBe(true); // Timișoara
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateRO("0722 123 456").isValid).toBe(true);
    expect(validateRO("0722-123-456").isValid).toBe(true);
    expect(validateRO("021 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+40)", () => {
    expect(validateRO("+40 722 123 456").isValid).toBe(true);
    expect(validateRO("+40 21 234 5678").isValid).toBe(true);
    expect(validateRO("40 722 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateRO("0722 123 45").isValid).toBe(false);
    expect(validateRO("0722 123 45678").isValid).toBe(false);
    expect(validateRO("").isValid).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateRO("0712 123 456").isValid).toBe(false);
    expect(validateRO("0700 123 456").isValid).toBe(false);
  });
});





