import { describe, test, expect } from "vitest";
import { validateMW } from "../../src/validators/africa/mw";

describe("validateMW - Malawi phone numbers", () => {
  test("should accept valid Malawi phone numbers", () => {
    expect(validateMW("99 123 4567").isValid).toBe(true);
    expect(validateMW("1 123 456").isValid).toBe(true);
  });

  test("should accept international format (+265)", () => {
    expect(validateMW("+265 99 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateMW("29 123 4567").isValid).toBe(false);
    expect(validateMW("").isValid).toBe(false);
  });
});

