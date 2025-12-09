import { describe, test, expect } from "vitest";
import { validateBH } from "../src/validators/bh";

describe("validateBH - Bahraini phone numbers", () => {
  test("should accept valid Bahraini mobile numbers", () => {
    expect(validateBH("3123 4567")).toBe(true); // Batelco/Zain/Viva
    expect(validateBH("36123456")).toBe(true); // no formatting
  });

  test("should accept Bahraini landline numbers", () => {
    expect(validateBH("1123 4567")).toBe(true); // Manama
    expect(validateBH("7123 4567")).toBe(true);
    expect(validateBH("17123456")).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBH("3123 4567")).toBe(true);
    expect(validateBH("3123-4567")).toBe(true);
    expect(validateBH("1 123 4567")).toBe(true);
  });

  test("should accept international format (+973)", () => {
    expect(validateBH("+973 3123 4567")).toBe(true); // mobile
    expect(validateBH("+973 1123 4567")).toBe(true); // landline
    expect(validateBH("973 3123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBH("3123 456")).toBe(false); // too short
    expect(validateBH("3123 45678")).toBe(false); // too long
    expect(validateBH("312")).toBe(false);
    expect(validateBH("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateBH("2123 4567")).toBe(false); // must start 3 (mobile) or 1,7 (landline)
    expect(validateBH("5123 4567")).toBe(false);
  });
});

