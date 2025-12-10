import { describe, test, expect } from "vitest";
import { validateZA } from "../src/validators/za";

describe("validateZA - South African phone numbers", () => {
  test("should accept valid South African mobile numbers", () => {
    expect(validateZA("072 123 4567").isValid).toBe(true);
    expect(validateZA("082 123 4567").isValid).toBe(true);
    expect(validateZA("071 123 4567").isValid).toBe(true);
  });

  test("should accept South African landline numbers", () => {
    expect(validateZA("011 123 4567").isValid).toBe(true); // Johannesburg
    expect(validateZA("021 123 4567").isValid).toBe(true); // Cape Town
    expect(validateZA("031 123 4567").isValid).toBe(true); // Durban
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateZA("072 123 4567").isValid).toBe(true);
    expect(validateZA("072-123-4567").isValid).toBe(true);
    expect(validateZA("011 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+27)", () => {
    expect(validateZA("+27 72 123 4567").isValid).toBe(true);
    expect(validateZA("+27 11 123 4567").isValid).toBe(true);
    expect(validateZA("27 72 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateZA("072 123 456").isValid).toBe(false);
    expect(validateZA("072 123 45678").isValid).toBe(false);
    expect(validateZA("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateZA("092 123 4567").isValid).toBe(false);
    expect(validateZA("001 123 4567").isValid).toBe(false);
  });
});





