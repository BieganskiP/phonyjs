import { describe, test, expect } from "vitest";
import { validateKW } from "../src/validators/kw";

describe("validateKW - Kuwaiti phone numbers", () => {
  test("should accept valid Kuwaiti mobile numbers", () => {
    expect(validateKW("5123 4567")).toBe(true); // Zain
    expect(validateKW("6123 4567")).toBe(true); // Ooredoo
    expect(validateKW("9123 4567")).toBe(true); // Viva
    expect(validateKW("51234567")).toBe(true); // no formatting
  });

  test("should accept Kuwaiti landline numbers", () => {
    expect(validateKW("2123 4567")).toBe(true);
    expect(validateKW("22123456")).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKW("5123 4567")).toBe(true);
    expect(validateKW("5123-4567")).toBe(true);
    expect(validateKW("2 123 4567")).toBe(true);
  });

  test("should accept international format (+965)", () => {
    expect(validateKW("+965 5123 4567")).toBe(true); // mobile
    expect(validateKW("+965 2123 4567")).toBe(true); // landline
    expect(validateKW("965 9123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKW("5123 456")).toBe(false); // too short
    expect(validateKW("5123 45678")).toBe(false); // too long
    expect(validateKW("512")).toBe(false);
    expect(validateKW("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateKW("3123 4567")).toBe(false); // must start 5,6,9 (mobile) or 2 (landline)
    expect(validateKW("7123 4567")).toBe(false);
  });
});

