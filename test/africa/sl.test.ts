import { describe, test, expect } from "vitest";
import { validateSL } from "../../src/validators/africa/sl";

describe("validateSL - Sierra Leone phone numbers", () => {
  test("should accept valid Sierra Leone phone numbers", () => {
    expect(validateSL("76 123 456").isValid).toBe(true);
    expect(validateSL("88 123 456").isValid).toBe(true);
    expect(validateSL("22 123 456").isValid).toBe(true);
  });

  test("should accept international format (+232)", () => {
    expect(validateSL("+232 76 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateSL("16 123 456").isValid).toBe(false);
    expect(validateSL("").isValid).toBe(false);
  });
});

