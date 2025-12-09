import { describe, test, expect } from "vitest";
import { validateSA } from "../src/validators/sa";

describe("validateSA - Saudi Arabian phone numbers", () => {
  test("should accept valid Saudi mobile numbers", () => {
    // STC (050, 053, 055)
    expect(validateSA("0501234567")).toBe(true);
    expect(validateSA("0531234567")).toBe(true);
    expect(validateSA("0551234567")).toBe(true);
    
    // Mobily (054, 056)
    expect(validateSA("0541234567")).toBe(true);
    expect(validateSA("0561234567")).toBe(true);
    
    // Zain (058, 059)
    expect(validateSA("0581234567")).toBe(true);
    expect(validateSA("0591234567")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSA("050 123 4567")).toBe(true);
    expect(validateSA("050-123-4567")).toBe(true);
    expect(validateSA("050 1234 567")).toBe(true);
  });

  test("should accept international format (+966)", () => {
    expect(validateSA("+966 50 123 4567")).toBe(true);
    expect(validateSA("+966501234567")).toBe(true);
    expect(validateSA("966 54 123 4567")).toBe(true);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateSA("0511234567")).toBe(false); // 051 not valid
    expect(validateSA("0521234567")).toBe(false); // 052 not valid
    expect(validateSA("0571234567")).toBe(false); // 057 not valid
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSA("050123456")).toBe(false); // too short
    expect(validateSA("05012345678")).toBe(false); // too long
    expect(validateSA("050")).toBe(false);
    expect(validateSA("")).toBe(false);
  });

  test("should reject phone numbers not starting with 05", () => {
    expect(validateSA("1234567890")).toBe(false);
    expect(validateSA("0411234567")).toBe(false); // landline format
    expect(validateSA("5501234567")).toBe(false); // missing leading 0
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validateSA("abc defg hijk")).toBe(false);
    expect(validateSA("----------")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateSA("050123456a")).toBe(false);
    expect(validateSA("a501234567")).toBe(false);
  });
});

