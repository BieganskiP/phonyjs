import { describe, test, expect } from "vitest";
import { validateRW } from "../../src/validators/africa/rw";

describe("validateRW - Rwanda phone numbers", () => {
  test("should accept valid Rwanda phone numbers", () => {
    expect(validateRW("78 123 4567").isValid).toBe(true);
    expect(validateRW("25 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+250)", () => {
    expect(validateRW("+250 78 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateRW("18 123 4567").isValid).toBe(false);
    expect(validateRW("").isValid).toBe(false);
  });
});

