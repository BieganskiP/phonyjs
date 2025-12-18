import { describe, test, expect } from "vitest";
import { validateNE } from "../../src/validators/africa/ne";

describe("validateNE - Niger phone numbers", () => {
  test("should accept valid Niger phone numbers", () => {
    expect(validateNE("90 12 34 56").isValid).toBe(true);
    expect(validateNE("80 12 34 56").isValid).toBe(true);
    expect(validateNE("20 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+227)", () => {
    expect(validateNE("+227 90 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateNE("10 12 34 56").isValid).toBe(false);
    expect(validateNE("").isValid).toBe(false);
  });
});

