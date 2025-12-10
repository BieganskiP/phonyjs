import { describe, test, expect } from "vitest";
import { validateCZ } from "../src/validators/cz";

describe("validateCZ - Czech phone numbers", () => {
  test("should accept valid Czech mobile numbers", () => {
    expect(validateCZ("601 123 456").isValid).toBe(true);
    expect(validateCZ("721 123 456").isValid).toBe(true);
    expect(validateCZ("777 123 456").isValid).toBe(true);
  });

  test("should accept Czech landline numbers", () => {
    expect(validateCZ("234 567 890").isValid).toBe(true); // Prague
    expect(validateCZ("312 345 678").isValid).toBe(true); // West Bohemia
    expect(validateCZ("541 234 567").isValid).toBe(true); // Moravia
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCZ("601 123 456").isValid).toBe(true);
    expect(validateCZ("601-123-456").isValid).toBe(true);
    expect(validateCZ("234 567 890").isValid).toBe(true);
  });

  test("should accept international format (+420)", () => {
    expect(validateCZ("+420 601 123 456").isValid).toBe(true);
    expect(validateCZ("+420 234 567 890").isValid).toBe(true);
    expect(validateCZ("420 601 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCZ("601 123 45").isValid).toBe(false);
    expect(validateCZ("601 123 4567").isValid).toBe(false);
    expect(validateCZ("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateCZ("801 123 456").isValid).toBe(false);
    expect(validateCZ("101 123 456").isValid).toBe(false);
  });
});





