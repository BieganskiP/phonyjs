import { describe, test, expect } from "vitest";
import { validateAU } from "../src/validators/au";

describe("validateAU - Australian phone numbers", () => {
  test("should accept valid Australian mobile numbers", () => {
    expect(validateAU("0412345678")).toBe(true);
    expect(validateAU("0487654321")).toBe(true);
    expect(validateAU("0498765432")).toBe(true);
    expect(validateAU("0456789012")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAU("04 1234 5678")).toBe(true);
    expect(validateAU("04-1234-5678")).toBe(true);
    expect(validateAU("0412 345 678")).toBe(true);
  });

  test("should accept international format (+61)", () => {
    expect(validateAU("+61 4 1234 5678")).toBe(true);
    expect(validateAU("+61412345678")).toBe(true);
    expect(validateAU("61 4 1234 5678")).toBe(true);
  });

  test("should reject phone numbers not starting with 04", () => {
    expect(validateAU("0512345678")).toBe(false); // starts with 05
    expect(validateAU("0312345678")).toBe(false); // starts with 03 (landline)
    expect(validateAU("0212345678")).toBe(false); // starts with 02 (landline)
    expect(validateAU("4123456789")).toBe(false); // missing leading 0
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAU("041234567")).toBe(false); // too short
    expect(validateAU("04123456789")).toBe(false); // too long
    expect(validateAU("04")).toBe(false);
    expect(validateAU("")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateAU("041234567a")).toBe(false);
    expect(validateAU("a412345678")).toBe(false);
  });
});

