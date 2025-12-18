import { describe, test, expect } from "vitest";
import { validateCM } from "../../src/validators/africa/cm";

describe("validateCM - Cameroon phone numbers", () => {
  test("should accept valid Cameroon phone numbers", () => {
    expect(validateCM("6 71 23 45 67").isValid).toBe(true);
    expect(validateCM("2 22 12 34 56").isValid).toBe(true);
    expect(validateCM("3 33 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+237)", () => {
    expect(validateCM("+237 6 71 23 45 67").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateCM("1 71 23 45 67").isValid).toBe(false);
    expect(validateCM("").isValid).toBe(false);
  });
});

