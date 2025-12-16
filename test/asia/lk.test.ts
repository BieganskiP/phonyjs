import { describe, test, expect } from "vitest";
import { validateLK } from "../../src/validators/asia/lk";

describe("validateLK - Sri Lankan phone numbers", () => {
  test("should accept valid Sri Lankan mobile numbers", () => {
    expect(validateLK("071 234 5678").isValid).toBe(true);
    expect(validateLK("077 234 5678").isValid).toBe(true);
    expect(validateLK("075 234 5678").isValid).toBe(true);
  });

  test("should accept Sri Lankan landline numbers", () => {
    expect(validateLK("011 234 5678").isValid).toBe(true); // Colombo
    expect(validateLK("081 234 5678").isValid).toBe(true); // Kandy
    expect(validateLK("091 234 5678").isValid).toBe(true); // Jaffna
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateLK("071 234 5678").isValid).toBe(true);
    expect(validateLK("071-234-5678").isValid).toBe(true);
    expect(validateLK("011 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+94)", () => {
    expect(validateLK("+94 71 234 5678").isValid).toBe(true);
    expect(validateLK("+94 11 234 5678").isValid).toBe(true);
    expect(validateLK("94 71 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLK("071 234 567").isValid).toBe(false);
    expect(validateLK("071 234 56789").isValid).toBe(false);
    expect(validateLK("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateLK("001 234 5678").isValid).toBe(false);
    expect(validateLK("171 234 5678").isValid).toBe(false);
  });
});





