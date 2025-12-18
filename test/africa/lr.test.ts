import { describe, test, expect } from "vitest";
import { validateLR } from "../../src/validators/africa/lr";

describe("validateLR - Liberia phone numbers", () => {
  test("should accept valid Liberia phone numbers", () => {
    expect(validateLR("77 123 456").isValid).toBe(true);
    expect(validateLR("88 123 456").isValid).toBe(true);
    expect(validateLR("221 234 5").isValid).toBe(true);
  });

  test("should accept international format (+231)", () => {
    expect(validateLR("+231 77 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateLR("11 123 456").isValid).toBe(false);
    expect(validateLR("").isValid).toBe(false);
  });
});

