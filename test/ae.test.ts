import { describe, test, expect } from "vitest";
import { validateAE } from "../src/validators/ae";

describe("validateAE - UAE phone numbers", () => {
  test("should accept valid UAE mobile numbers", () => {
    // Etisalat (050, 052, 056)
    expect(validateAE("0501234567")).toBe(true);
    expect(validateAE("0521234567")).toBe(true);
    expect(validateAE("0561234567")).toBe(true);
    
    // du (054, 055, 058)
    expect(validateAE("0541234567")).toBe(true);
    expect(validateAE("0551234567")).toBe(true);
    expect(validateAE("0581234567")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAE("050 123 4567")).toBe(true);
    expect(validateAE("050-123-4567")).toBe(true);
    expect(validateAE("050 1234 567")).toBe(true);
  });

  test("should accept international format (+971)", () => {
    expect(validateAE("+971 50 123 4567")).toBe(true);
    expect(validateAE("+971501234567")).toBe(true);
    expect(validateAE("971 54 123 4567")).toBe(true);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateAE("0511234567")).toBe(false); // 051 not valid
    expect(validateAE("0531234567")).toBe(false); // 053 not valid
    expect(validateAE("0571234567")).toBe(false); // 057 not valid
    expect(validateAE("0591234567")).toBe(false); // 059 not valid
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAE("050123456")).toBe(false); // too short
    expect(validateAE("05012345678")).toBe(false); // too long
    expect(validateAE("050")).toBe(false);
    expect(validateAE("")).toBe(false);
  });

  test("should reject phone numbers not starting with 05", () => {
    expect(validateAE("1234567890")).toBe(false);
    expect(validateAE("5012345678")).toBe(false); // missing leading 0
  });
});

