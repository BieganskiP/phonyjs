import { describe, test, expect } from "vitest";
import { validateMR } from "../../src/validators/africa/mr";

describe("validateMR - Mauritania phone numbers", () => {
  test("should accept valid Mauritania phone numbers", () => {
    expect(validateMR("22 12 34 56").isValid).toBe(true);
    expect(validateMR("33 12 34 56").isValid).toBe(true);
    expect(validateMR("45 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+222)", () => {
    expect(validateMR("+222 22 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateMR("12 12 34 56").isValid).toBe(false);
    expect(validateMR("").isValid).toBe(false);
  });
});

