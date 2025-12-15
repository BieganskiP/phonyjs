import { describe, test, expect } from "vitest";
import { validateKG } from "../../src/validators/asia-pacific/kg";

describe("validateKG - Kyrgyzstan phone numbers", () => {
  test("should accept valid Kyrgyzstan mobile numbers", () => {
    expect(validateKG("555 123 456").isValid).toBe(true);
    expect(validateKG("700 123 456").isValid).toBe(true);
    expect(validateKG("777 123 456").isValid).toBe(true);
  });

  test("should accept Kyrgyzstan landline numbers", () => {
    expect(validateKG("312 123 456").isValid).toBe(true); // Bishkek
    expect(validateKG("3722 12 345").isValid).toBe(true); // Osh
    expect(validateKG("3922 12 345").isValid).toBe(true); // Jalal-Abad
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKG("555 123 456").isValid).toBe(true);
    expect(validateKG("555-123-456").isValid).toBe(true);
    expect(validateKG("312 123 456").isValid).toBe(true);
  });

  test("should accept international format (+996)", () => {
    expect(validateKG("+996 555 123 456").isValid).toBe(true);
    expect(validateKG("+996 312 123 456").isValid).toBe(true);
    expect(validateKG("996 555 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKG("555 123 45").isValid).toBe(false);
    expect(validateKG("555 123 4567").isValid).toBe(false);
    expect(validateKG("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateKG("155 123 456").isValid).toBe(false);
    expect(validateKG("855 123 456").isValid).toBe(false);
  });
});





