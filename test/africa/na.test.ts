import { describe, test, expect } from "vitest";
import { validateNA } from "../../src/validators/africa/na";

describe("validateNA - Namibia phone numbers", () => {
  test("should accept valid Namibia phone numbers", () => {
    expect(validateNA("81 123 456").isValid).toBe(true);
    expect(validateNA("61 234 567").isValid).toBe(true);
  });

  test("should accept international format (+264)", () => {
    expect(validateNA("+264 81 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateNA("11 123 4567").isValid).toBe(false);
    expect(validateNA("").isValid).toBe(false);
  });
});

