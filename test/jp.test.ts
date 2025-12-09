import { describe, test, expect } from "vitest";
import { validateJP } from "../src/validators/jp";

describe("validateJP - Japanese phone numbers", () => {
  test("should accept valid Japanese mobile numbers", () => {
    expect(validateJP("09012345678")).toBe(true);
    expect(validateJP("08012345678")).toBe(true);
    expect(validateJP("07012345678")).toBe(true);
  });

  test("should accept Japanese landline numbers", () => {
    expect(validateJP("0312345678")).toBe(true); // Tokyo
    expect(validateJP("0612345678")).toBe(true); // Osaka
    expect(validateJP("0451234567")).toBe(true); // Yokohama
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateJP("090 1234 5678")).toBe(true);
    expect(validateJP("090-1234-5678")).toBe(true);
    expect(validateJP("03 1234 5678")).toBe(true);
  });

  test("should accept international format (+81)", () => {
    expect(validateJP("+81 90 1234 5678")).toBe(true); // mobile
    expect(validateJP("+81 3 1234 5678")).toBe(true); // landline Tokyo
    expect(validateJP("81 90 1234 5678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateJP("090123456")).toBe(false); // too short
    expect(validateJP("0901234567890")).toBe(false); // too long
    expect(validateJP("090")).toBe(false);
    expect(validateJP("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateJP("0012345678")).toBe(false);
    expect(validateJP("1012345678")).toBe(false);
  });
});

