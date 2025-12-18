import { describe, test, expect } from "vitest";
import { validateMA } from "../../src/validators/africa/ma";

describe("validateMA - Moroccan phone numbers", () => {
  test("should accept valid Moroccan mobile numbers", () => {
    expect(validateMA("612 34 56 78").isValid).toBe(true);
    expect(validateMA("712 34 56 78").isValid).toBe(true);
    expect(validateMA("661 23 45 67").isValid).toBe(true);
  });

  test("should accept Moroccan landline numbers", () => {
    expect(validateMA("520 12 34 56").isValid).toBe(true); // Casablanca
    expect(validateMA("537 12 34 56").isValid).toBe(true); // Rabat
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMA("612 34 56 78").isValid).toBe(true);
    expect(validateMA("612-34-56-78").isValid).toBe(true);
  });

  test("should accept international format (+212)", () => {
    expect(validateMA("+212 612 34 56 78").isValid).toBe(true);
    expect(validateMA("212 520 12 34 56").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMA("612 34 56 7").isValid).toBe(false);
    expect(validateMA("612 34 56 789").isValid).toBe(false);
    expect(validateMA("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateMA("812 34 56 78").isValid).toBe(false);
    expect(validateMA("412 34 56 78").isValid).toBe(false);
  });
});

