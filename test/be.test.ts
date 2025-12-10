import { describe, test, expect } from "vitest";
import { validateBE } from "../src/validators/be";

describe("validateBE - Belgian phone numbers", () => {
  test("should accept valid Belgian mobile numbers", () => {
    expect(validateBE("0470 12 34 56").isValid).toBe(true);
    expect(validateBE("0475 12 34 56").isValid).toBe(true);
    expect(validateBE("0498 12 34 56").isValid).toBe(true);
  });

  test("should accept Belgian landline numbers", () => {
    expect(validateBE("02 123 45 67").isValid).toBe(true); // Brussels
    expect(validateBE("03 123 45 67").isValid).toBe(true); // Antwerp
    expect(validateBE("09 123 45 67").isValid).toBe(true); // Ghent
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBE("0470 12 34 56").isValid).toBe(true);
    expect(validateBE("0470-12-34-56").isValid).toBe(true);
    expect(validateBE("02 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+32)", () => {
    expect(validateBE("+32 470 12 34 56").isValid).toBe(true);
    expect(validateBE("+32 2 123 45 67").isValid).toBe(true);
    expect(validateBE("32 470 12 34 56").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBE("0470 12 34 5").isValid).toBe(false);
    expect(validateBE("0470 12 34 567").isValid).toBe(false);
    expect(validateBE("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateBE("0440 12 34 56").isValid).toBe(false);
    expect(validateBE("0410 12 34 56").isValid).toBe(false);
  });
});





