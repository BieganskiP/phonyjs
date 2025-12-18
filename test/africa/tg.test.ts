import { describe, test, expect } from "vitest";
import { validateTG } from "../../src/validators/africa/tg";

describe("validateTG - Togo phone numbers", () => {
  test("should accept valid Togo phone numbers", () => {
    expect(validateTG("90 12 34 56").isValid).toBe(true);
    expect(validateTG("70 12 34 56").isValid).toBe(true);
    expect(validateTG("22 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+228)", () => {
    expect(validateTG("+228 90 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateTG("10 12 34 56").isValid).toBe(false);
    expect(validateTG("").isValid).toBe(false);
  });
});

