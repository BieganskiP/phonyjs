import { describe, test, expect } from "vitest";
import { validateMY } from "../../src/validators/asia-pacific/my";

describe("validateMY - Malaysian phone numbers", () => {
  test("should accept valid Malaysian mobile numbers", () => {
    expect(validateMY("012 345 6789").isValid).toBe(true);
    expect(validateMY("013 345 6789").isValid).toBe(true);
    expect(validateMY("019 345 6789").isValid).toBe(true);
  });

  test("should accept Malaysian landline numbers", () => {
    expect(validateMY("03 1234 5678").isValid).toBe(true); // Kuala Lumpur
    expect(validateMY("04 123 4567").isValid).toBe(true); // Penang
    expect(validateMY("07 123 4567").isValid).toBe(true); // Johor
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMY("012 345 6789").isValid).toBe(true);
    expect(validateMY("012-345-6789").isValid).toBe(true);
    expect(validateMY("03 1234 5678").isValid).toBe(true);
  });

  test("should accept international format (+60)", () => {
    expect(validateMY("+60 12 345 6789").isValid).toBe(true);
    expect(validateMY("+60 3 1234 5678").isValid).toBe(true);
    expect(validateMY("60 12 345 6789").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMY("012 345 678").isValid).toBe(false);
    expect(validateMY("012 345 678901").isValid).toBe(false);
    expect(validateMY("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateMY("002 345 6789").isValid).toBe(false);
    expect(validateMY("112 345 6789").isValid).toBe(false);
  });
});





