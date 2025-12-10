import { describe, test, expect } from "vitest";
import { validateOM } from "../src/validators/om";

describe("validateOM - Omani phone numbers", () => {
  test("should accept valid Omani mobile numbers", () => {
    expect(validateOM("7123 4567").isValid).toBe(true); // Omantel
    expect(validateOM("9123 4567").isValid).toBe(true); // Ooredoo
    expect(validateOM("9512 3456").isValid).toBe(true);
    expect(validateOM("71234567").isValid).toBe(true); // no formatting
  });

  test("should accept Omani landline numbers", () => {
    expect(validateOM("24 12 3456").isValid).toBe(true); // Muscat
    expect(validateOM("25 12 3456").isValid).toBe(true); // Sohar
    expect(validateOM("26 12 3456").isValid).toBe(true); // Nizwa
    expect(validateOM("23 12 3456").isValid).toBe(true); // Salalah
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateOM("7123 4567").isValid).toBe(true);
    expect(validateOM("7123-4567").isValid).toBe(true);
    expect(validateOM("24 12 3456").isValid).toBe(true);
  });

  test("should accept international format (+968)", () => {
    expect(validateOM("+968 7123 4567").isValid).toBe(true); // mobile
    expect(validateOM("+968 24 12 3456").isValid).toBe(true); // landline
    expect(validateOM("968 7123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateOM("7123 456").isValid).toBe(false); // too short
    expect(validateOM("7123 45678").isValid).toBe(false); // too long
    expect(validateOM("71").isValid).toBe(false);
    expect(validateOM("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateOM("8123 4567").isValid).toBe(false); // must start 7, 9, or 2
    expect(validateOM("5123 4567").isValid).toBe(false);
  });
});





