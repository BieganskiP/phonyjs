import { describe, test, expect } from "vitest";
import { validateML } from "../../src/validators/africa/ml";

describe("validateML - Mali phone numbers", () => {
  test("should accept valid Mali phone numbers", () => {
    expect(validateML("70 12 34 56").isValid).toBe(true);
    expect(validateML("90 12 34 56").isValid).toBe(true);
    expect(validateML("20 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+223)", () => {
    expect(validateML("+223 70 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateML("10 12 34 56").isValid).toBe(false);
    expect(validateML("").isValid).toBe(false);
  });
});

