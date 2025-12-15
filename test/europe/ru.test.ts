import { describe, test, expect } from "vitest";
import { validateRU } from "../../src/validators/europe/ru";

describe("validateRU - Russian phone numbers", () => {
  test("should accept valid Russian mobile numbers", () => {
    expect(validateRU("8 912 345 67 89").isValid).toBe(true); // domestic format with 8
    expect(validateRU("8 999 123 45 67").isValid).toBe(true);
    expect(validateRU("9123456789").isValid).toBe(true); // without 7/8 prefix
  });

  test("should accept Russian landline numbers", () => {
    expect(validateRU("8 495 123 45 67").isValid).toBe(true); // Moscow
    expect(validateRU("8 812 123 45 67").isValid).toBe(true); // St. Petersburg
    expect(validateRU("8 383 123 45 67").isValid).toBe(true); // Novosibirsk
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateRU("8 912 345 67 89").isValid).toBe(true);
    expect(validateRU("8-912-345-67-89").isValid).toBe(true);
    expect(validateRU("8 495 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+7)", () => {
    expect(validateRU("+7 912 345 67 89").isValid).toBe(true);
    expect(validateRU("+7 495 123 45 67").isValid).toBe(true);
    expect(validateRU("7 912 345 67 89").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateRU("8 912 345 67 8").isValid).toBe(false);
    expect(validateRU("8 912 345 67 890").isValid).toBe(false);
    expect(validateRU("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateRU("8 112 345 67 89").isValid).toBe(false);
    expect(validateRU("8 012 345 67 89").isValid).toBe(false);
  });
});





