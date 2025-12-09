import { describe, test, expect } from "vitest";
import { validateTH } from "../src/validators/th";

describe("validateTH - Thai phone numbers", () => {
  test("should accept valid Thai mobile numbers", () => {
    expect(validateTH("081 234 5678")).toBe(true);
    expect(validateTH("092 234 5678")).toBe(true);
    expect(validateTH("064 234 5678")).toBe(true);
  });

  test("should accept Thai landline numbers", () => {
    expect(validateTH("02 123 4567")).toBe(true); // Bangkok
    expect(validateTH("053 123 456")).toBe(true); // Chiang Mai
    expect(validateTH("076 123 456")).toBe(true); // Phuket
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTH("081 234 5678")).toBe(true);
    expect(validateTH("081-234-5678")).toBe(true);
    expect(validateTH("02 123 4567")).toBe(true);
  });

  test("should accept international format (+66)", () => {
    expect(validateTH("+66 81 234 5678")).toBe(true);
    expect(validateTH("+66 2 123 4567")).toBe(true);
    expect(validateTH("66 81 234 5678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTH("081 234 567")).toBe(false);
    expect(validateTH("081 234 56789")).toBe(false);
    expect(validateTH("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTH("001 234 5678")).toBe(false);
    expect(validateTH("011 234 5678")).toBe(false);
  });
});

