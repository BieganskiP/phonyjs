import { describe, test, expect } from "vitest";
import { validateIQ } from "../../src/validators/middle-east/iq";

describe("validateIQ - Iraqi phone numbers", () => {
  test("should accept valid Iraqi mobile numbers", () => {
    expect(validateIQ("7812 345 678").isValid).toBe(true); // Zain/Asiacell/Korek
    expect(validateIQ("7901234567").isValid).toBe(true); // no formatting
  });

  test("should accept Iraqi landline numbers", () => {
    expect(validateIQ("1 234 5678").isValid).toBe(true); // Baghdad
    expect(validateIQ("30 234 5678").isValid).toBe(true); // Najaf
    expect(validateIQ("123456789").isValid).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIQ("7812 345 678").isValid).toBe(true);
    expect(validateIQ("7812-345-678").isValid).toBe(true);
    expect(validateIQ("1 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+964)", () => {
    expect(validateIQ("+964 7812 345 678").isValid).toBe(true); // mobile
    expect(validateIQ("+964 1 234 5678").isValid).toBe(true); // landline
    expect(validateIQ("964 7812 345 678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIQ("7812 345 67").isValid).toBe(false); // too short
    expect(validateIQ("7812 345 67890").isValid).toBe(false); // too long
    expect(validateIQ("78").isValid).toBe(false);
    expect(validateIQ("").isValid).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateIQ("8812 345 678").isValid).toBe(false); // mobile must start with 7
    expect(validateIQ("6812 345 678").isValid).toBe(false);
  });
});





