import { describe, test, expect } from "vitest";
import { validateKR } from "../src/validators/kr";

describe("validateKR - South Korean phone numbers", () => {
  test("should accept valid Korean mobile numbers", () => {
    expect(validateKR("01012345678")).toBe(true); // 11 digits
    expect(validateKR("0101234567")).toBe(true); // 10 digits
  });

  test("should accept Korean landline numbers", () => {
    expect(validateKR("0212345678")).toBe(true); // Seoul
    expect(validateKR("03112345678")).toBe(true); // Gyeonggi
    expect(validateKR("05112345678")).toBe(true); // Busan
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKR("010 1234 5678")).toBe(true);
    expect(validateKR("010-1234-5678")).toBe(true);
    expect(validateKR("02 1234 5678")).toBe(true);
  });

  test("should accept international format (+82)", () => {
    expect(validateKR("+82 10 1234 5678")).toBe(true); // mobile
    expect(validateKR("+82 2 1234 5678")).toBe(true); // landline Seoul
    expect(validateKR("82 10 1234 5678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKR("010123456")).toBe(false); // too short
    expect(validateKR("010123456789")).toBe(false); // too long
    expect(validateKR("010")).toBe(false);
    expect(validateKR("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateKR("00012345678")).toBe(false);
    expect(validateKR("11012345678")).toBe(false);
  });
});

