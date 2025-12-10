import { describe, test, expect } from "vitest";
import { validateSN } from "../src/validators/sn";

describe("validateSN - Senegalese phone numbers", () => {
  test("should accept valid Senegalese mobile numbers", () => {
    expect(validateSN("77 123 45 67").isValid).toBe(true);
    expect(validateSN("70 123 45 67").isValid).toBe(true);
    expect(validateSN("76 123 45 67").isValid).toBe(true);
  });

  test("should accept Senegalese landline numbers", () => {
    expect(validateSN("33 123 45 67").isValid).toBe(true);
    expect(validateSN("30 123 45 67").isValid).toBe(true);
    expect(validateSN("38 123 45 67").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSN("77 123 45 67").isValid).toBe(true);
    expect(validateSN("77-123-45-67").isValid).toBe(true);
    expect(validateSN("33 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+221)", () => {
    expect(validateSN("+221 77 123 45 67").isValid).toBe(true);
    expect(validateSN("+221 33 123 45 67").isValid).toBe(true);
    expect(validateSN("221 77 123 45 67").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSN("77 123 45 6").isValid).toBe(false);
    expect(validateSN("77 123 45 678").isValid).toBe(false);
    expect(validateSN("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateSN("17 123 45 67").isValid).toBe(false);
    expect(validateSN("87 123 45 67").isValid).toBe(false);
  });
});





