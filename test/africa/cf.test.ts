import { describe, test, expect } from "vitest";
import { validateCF } from "../../src/validators/africa/cf";

describe("validateCF - Central African Republic phone numbers", () => {
  test("should accept valid CAR phone numbers", () => {
    expect(validateCF("70 12 34 56").isValid).toBe(true);
    expect(validateCF("21 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+236)", () => {
    expect(validateCF("+236 70 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateCF("10 12 34 56").isValid).toBe(false);
    expect(validateCF("").isValid).toBe(false);
  });
});

