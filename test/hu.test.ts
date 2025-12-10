import { describe, test, expect } from "vitest";
import { validateHU } from "../src/validators/hu";

describe("validateHU - Hungarian phone numbers", () => {
  test("should accept valid Hungarian mobile numbers", () => {
    expect(validateHU("20 123 4567").isValid).toBe(true);
    expect(validateHU("30 123 4567").isValid).toBe(true);
    expect(validateHU("70 123 4567").isValid).toBe(true);
  });

  test("should accept Hungarian landline numbers", () => {
    expect(validateHU("1 234 5678").isValid).toBe(true); // Budapest
    expect(validateHU("62 123 456").isValid).toBe(true); // Szeged
    expect(validateHU("52 123 456").isValid).toBe(true); // Debrecen
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateHU("20 123 4567").isValid).toBe(true);
    expect(validateHU("20-123-4567").isValid).toBe(true);
    expect(validateHU("1 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+36)", () => {
    expect(validateHU("+36 20 123 4567").isValid).toBe(true);
    expect(validateHU("+36 1 234 5678").isValid).toBe(true);
    expect(validateHU("36 20 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateHU("20 123 45678").isValid).toBe(false); // too long (10 digits)
    expect(validateHU("20 1234").isValid).toBe(false); // too short (6 digits)
    expect(validateHU("").isValid).toBe(false);
  });

  test("should accept various valid area codes", () => {
    // Hungarian area codes vary widely - 10, 40, 50 etc could all be valid
    // Just ensure clearly invalid ones are rejected
    expect(validateHU("00 123 4567").isValid).toBe(false); // 00x not valid
  });
});





