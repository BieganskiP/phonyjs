import { describe, test, expect } from "vitest";
import { validateMZ } from "../../src/validators/africa/mz";

describe("validateMZ - Mozambique phone numbers", () => {
  test("should accept valid Mozambique phone numbers", () => {
    expect(validateMZ("82 123 4567").isValid).toBe(true);
    expect(validateMZ("21 123 456").isValid).toBe(true);
  });

  test("should accept international format (+258)", () => {
    expect(validateMZ("+258 82 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateMZ("12 123 4567").isValid).toBe(false);
    expect(validateMZ("").isValid).toBe(false);
  });
});

