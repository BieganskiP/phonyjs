import { describe, test, expect } from "vitest";
import { validateDE } from "../src/validators/de";

describe("validateDE - German phone numbers", () => {
  test("should accept valid German mobile numbers", () => {
    expect(validateDE("015112345678")).toBe(true); // 11 digits
    expect(validateDE("01621234567")).toBe(true); // 10 digits
    expect(validateDE("017012345678")).toBe(true);
    expect(validateDE("015712345678")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateDE("0151 12345678")).toBe(true);
    expect(validateDE("0151-12345678")).toBe(true);
    expect(validateDE("0151 123 45678")).toBe(true);
  });

  test("should accept international format (+49)", () => {
    expect(validateDE("+49 151 12345678")).toBe(true);
    expect(validateDE("+4915112345678")).toBe(true);
    expect(validateDE("49 162 1234567")).toBe(true);
  });

  test("should reject phone numbers with incorrect prefix", () => {
    expect(validateDE("01412345678")).toBe(false); // starts with 014
    expect(validateDE("01812345678")).toBe(false); // starts with 018
    expect(validateDE("01912345678")).toBe(false); // starts with 019
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateDE("015112345")).toBe(false); // too short (9 digits)
    expect(validateDE("01511234567890")).toBe(false); // too long (14 digits)
    expect(validateDE("0151")).toBe(false);
    expect(validateDE("")).toBe(false);
  });

  test("should handle phone numbers with letters (strips them)", () => {
    // Letters are stripped, so these become valid if the resulting digits are valid
    expect(validateDE("0151-abc-12345678")).toBe(true); // becomes 015112345678
    expect(validateDE("a151123456")).toBe(false); // becomes 151123456 (no leading 0)
  });
});

