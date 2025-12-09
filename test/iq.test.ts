import { describe, test, expect } from "vitest";
import { validateIQ } from "../src/validators/iq";

describe("validateIQ - Iraqi phone numbers", () => {
  test("should accept valid Iraqi mobile numbers", () => {
    expect(validateIQ("7812 345 678")).toBe(true); // Zain/Asiacell/Korek
    expect(validateIQ("7901234567")).toBe(true); // no formatting
  });

  test("should accept Iraqi landline numbers", () => {
    expect(validateIQ("1 234 5678")).toBe(true); // Baghdad
    expect(validateIQ("30 234 5678")).toBe(true); // Najaf
    expect(validateIQ("123456789")).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIQ("7812 345 678")).toBe(true);
    expect(validateIQ("7812-345-678")).toBe(true);
    expect(validateIQ("1 234 5678")).toBe(true);
  });

  test("should accept international format (+964)", () => {
    expect(validateIQ("+964 7812 345 678")).toBe(true); // mobile
    expect(validateIQ("+964 1 234 5678")).toBe(true); // landline
    expect(validateIQ("964 7812 345 678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIQ("7812 345 67")).toBe(false); // too short
    expect(validateIQ("7812 345 67890")).toBe(false); // too long
    expect(validateIQ("78")).toBe(false);
    expect(validateIQ("")).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateIQ("8812 345 678")).toBe(false); // mobile must start with 7
    expect(validateIQ("6812 345 678")).toBe(false);
  });
});

