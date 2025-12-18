import { describe, test, expect } from "vitest";
import { validateLS } from "../../src/validators/africa/ls";

describe("validateLS - Lesotho phone numbers", () => {
  test("should accept valid Lesotho phone numbers", () => {
    expect(validateLS("5 123 4567").isValid).toBe(true);
    expect(validateLS("2 212 3456").isValid).toBe(true);
  });

  test("should accept international format (+266)", () => {
    expect(validateLS("+266 5 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateLS("1 123 4567").isValid).toBe(false);
    expect(validateLS("").isValid).toBe(false);
  });
});

