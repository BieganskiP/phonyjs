import { describe, test, expect } from "vitest";
import { validateDZ } from "../../src/validators/africa/dz";

describe("validateDZ - Algerian phone numbers", () => {
  test("should accept valid Algerian mobile numbers", () => {
    expect(validateDZ("551 23 45 67").isValid).toBe(true);
    expect(validateDZ("661 23 45 67").isValid).toBe(true);
    expect(validateDZ("771 23 45 67").isValid).toBe(true);
  });

  test("should accept Algerian landline numbers", () => {
    expect(validateDZ("21 123 45 67").isValid).toBe(true); // Algiers
    expect(validateDZ("31 123 45 67").isValid).toBe(true);
    expect(validateDZ("25 123 45 67").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateDZ("551 23 45 67").isValid).toBe(true);
    expect(validateDZ("551-23-45-67").isValid).toBe(true);
  });

  test("should accept international format (+213)", () => {
    expect(validateDZ("+213 551 23 45 67").isValid).toBe(true);
    expect(validateDZ("213 21 123 45 67").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateDZ("551 23 45 6").isValid).toBe(false);
    expect(validateDZ("551 23 45 678").isValid).toBe(false);
    expect(validateDZ("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateDZ("851 23 45 67").isValid).toBe(false);
    expect(validateDZ("151 23 45 67").isValid).toBe(false);
  });
});

