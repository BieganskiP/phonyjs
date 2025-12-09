import { describe, test, expect } from "vitest";
import { validateYE } from "../src/validators/ye";

describe("validateYE - Yemeni phone numbers", () => {
  test("should accept valid Yemeni mobile numbers", () => {
    expect(validateYE("7 1234 5678")).toBe(true); // Yemen Mobile/MTN/Sabafon
    expect(validateYE("712345678")).toBe(true); // no formatting
  });

  test("should accept Yemeni landline numbers", () => {
    expect(validateYE("1 234 567")).toBe(true); // Sana'a
    expect(validateYE("2 234 567")).toBe(true); // Aden
    expect(validateYE("123456789")).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateYE("7 1234 5678")).toBe(true);
    expect(validateYE("7-1234-5678")).toBe(true);
    expect(validateYE("1 234 5678")).toBe(true);
  });

  test("should accept international format (+967)", () => {
    expect(validateYE("+967 7 1234 5678")).toBe(true); // mobile
    expect(validateYE("+967 1 234 5678")).toBe(true); // landline
    expect(validateYE("967 7 1234 5678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateYE("7 1234 567")).toBe(false); // too short
    expect(validateYE("7 1234 56789")).toBe(false); // too long
    expect(validateYE("71")).toBe(false);
    expect(validateYE("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateYE("8 1234 5678")).toBe(false); // must start 7 (mobile) or 1-6 (landline)
    expect(validateYE("9 1234 5678")).toBe(false);
  });
});

