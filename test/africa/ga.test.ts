import { describe, test, expect } from "vitest";
import { validateGA } from "../../src/validators/africa/ga";

describe("validateGA - Gabon phone numbers", () => {
  test("should accept valid Gabon phone numbers", () => {
    expect(validateGA("07 12 34 56").isValid).toBe(true);
    expect(validateGA("1 123 456").isValid).toBe(true);
  });

  test("should accept international format (+241)", () => {
    expect(validateGA("+241 07 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateGA("27 12 34 56").isValid).toBe(false);
    expect(validateGA("").isValid).toBe(false);
  });
});

