import { describe, test, expect } from "vitest";
import { validateAU } from "../../src/validators/oceania/au";

describe("validateAU - Australian phone numbers", () => {
  test("should accept valid Australian mobile numbers", () => {
    expect(validateAU("0412345678").isValid).toBe(true);
    expect(validateAU("0487654321").isValid).toBe(true);
    expect(validateAU("0498765432").isValid).toBe(true);
    expect(validateAU("0456789012").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAU("04 1234 5678").isValid).toBe(true);
    expect(validateAU("04-1234-5678").isValid).toBe(true);
    expect(validateAU("0412 345 678").isValid).toBe(true);
  });

  test("should accept international format (+61)", () => {
    expect(validateAU("+61 4 1234 5678").isValid).toBe(true);
    expect(validateAU("+61412345678").isValid).toBe(true);
    expect(validateAU("61 4 1234 5678").isValid).toBe(true);
  });

  test("should accept Australian landline numbers", () => {
    expect(validateAU("0312345678").isValid).toBe(true); // landline (Melbourne)
    expect(validateAU("0212345678").isValid).toBe(true); // landline (Sydney)
    expect(validateAU("0712345678").isValid).toBe(true); // landline (Brisbane)
  });

  test("should reject invalid Australian numbers", () => {
    expect(validateAU("0512345678").isValid).toBe(false); // invalid prefix
    expect(validateAU("4123456789").isValid).toBe(false); // missing leading 0
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAU("041234567").isValid).toBe(false); // too short
    expect(validateAU("04123456789").isValid).toBe(false); // too long
    expect(validateAU("04").isValid).toBe(false);
    expect(validateAU("").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateAU("041234567a").isValid).toBe(false);
    expect(validateAU("a412345678").isValid).toBe(false);
  });
});





