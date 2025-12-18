import { describe, test, expect } from "vitest";
import { validateLY } from "../../src/validators/africa/ly";

describe("validateLY - Libyan phone numbers", () => {
  test("should accept valid Libyan mobile numbers", () => {
    expect(validateLY("91 2345 6789").isValid).toBe(true);
    expect(validateLY("92 2345 6789").isValid).toBe(true);
    expect(validateLY("94 2345 6789").isValid).toBe(true);
  });

  test("should accept Libyan landline numbers", () => {
    expect(validateLY("21 1234 567").isValid).toBe(true); // Tripoli
    expect(validateLY("61 1234 567").isValid).toBe(true); // Benghazi
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateLY("91 2345 6789").isValid).toBe(true);
    expect(validateLY("91-2345-6789").isValid).toBe(true);
  });

  test("should accept international format (+218)", () => {
    expect(validateLY("+218 91 2345 6789").isValid).toBe(true);
    expect(validateLY("218 21 1234 567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLY("91 234 567").isValid).toBe(false);
    expect(validateLY("91 234 5678 9012").isValid).toBe(false);
    expect(validateLY("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateLY("11 234 5678").isValid).toBe(false);
    expect(validateLY("99 234 5678").isValid).toBe(false);
  });
});

