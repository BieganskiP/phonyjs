import { describe, test, expect } from "vitest";
import { validateTD } from "../../src/validators/africa/td";

describe("validateTD - Chad phone numbers", () => {
  test("should accept valid Chad phone numbers", () => {
    expect(validateTD("66 12 34 56").isValid).toBe(true);
    expect(validateTD("77 12 34 56").isValid).toBe(true);
    expect(validateTD("22 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+235)", () => {
    expect(validateTD("+235 66 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateTD("10 12 34 56").isValid).toBe(false);
    expect(validateTD("").isValid).toBe(false);
  });
});

