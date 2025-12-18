import { describe, test, expect } from "vitest";
import { validateBF } from "../../src/validators/africa/bf";

describe("validateBF - Burkina Faso phone numbers", () => {
  test("should accept valid Burkina Faso phone numbers", () => {
    expect(validateBF("70 12 34 56").isValid).toBe(true);
    expect(validateBF("50 12 34 56").isValid).toBe(true);
    expect(validateBF("25 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+226)", () => {
    expect(validateBF("+226 70 12 34 56").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateBF("70 12 34 5").isValid).toBe(false);
    expect(validateBF("").isValid).toBe(false);
  });
});

