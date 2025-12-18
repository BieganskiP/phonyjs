import { describe, test, expect } from "vitest";
import { validateBW } from "../../src/validators/africa/bw";

describe("validateBW - Botswana phone numbers", () => {
  test("should accept valid Botswana phone numbers", () => {
    expect(validateBW("71 123 456").isValid).toBe(true);
    expect(validateBW("31 123 456").isValid).toBe(true);
  });

  test("should accept international format (+267)", () => {
    expect(validateBW("+267 71 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateBW("11 123 456").isValid).toBe(false);
    expect(validateBW("").isValid).toBe(false);
  });
});

