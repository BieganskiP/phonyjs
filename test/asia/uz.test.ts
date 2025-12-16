import { describe, test, expect } from "vitest";
import { validateUZ } from "../../src/validators/asia/uz";

describe("validateUZ - Uzbekistan phone numbers", () => {
  test("should accept valid Uzbekistan mobile numbers", () => {
    expect(validateUZ("90 123 45 67").isValid).toBe(true);
    expect(validateUZ("91 123 45 67").isValid).toBe(true);
    expect(validateUZ("88 123 45 67").isValid).toBe(true);
  });

  test("should accept Uzbekistan landline numbers", () => {
    expect(validateUZ("71 123 45 67").isValid).toBe(true); // Tashkent
    expect(validateUZ("662 123 456").isValid).toBe(true); // Samarkand
    expect(validateUZ("622 123 456").isValid).toBe(true); // Bukhara
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateUZ("90 123 45 67").isValid).toBe(true);
    expect(validateUZ("90-123-45-67").isValid).toBe(true);
    expect(validateUZ("71 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+998)", () => {
    expect(validateUZ("+998 90 123 45 67").isValid).toBe(true);
    expect(validateUZ("+998 71 123 45 67").isValid).toBe(true);
    expect(validateUZ("998 90 123 45 67").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateUZ("90 123 45 6").isValid).toBe(false);
    expect(validateUZ("90 123 45 678").isValid).toBe(false);
    expect(validateUZ("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateUZ("10 123 45 67").isValid).toBe(false);
    expect(validateUZ("80 123 45 67").isValid).toBe(false);
  });
});





