import { describe, test, expect } from "vitest";
import { validateEG } from "../src/validators/eg";

describe("validateEG - Egyptian phone numbers", () => {
  test("should accept valid Egyptian mobile numbers", () => {
    expect(validateEG("01012345678")).toBe(true); // Vodafone
    expect(validateEG("01112345678")).toBe(true); // Etisalat
    expect(validateEG("01212345678")).toBe(true); // Orange
    expect(validateEG("01512345678")).toBe(true); // WE
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateEG("010 1234 5678")).toBe(true);
    expect(validateEG("010-1234-5678")).toBe(true);
    expect(validateEG("010 12 34 56 78")).toBe(true);
  });

  test("should accept international format (+20)", () => {
    expect(validateEG("+20 10 1234 5678")).toBe(true);
    expect(validateEG("+201012345678")).toBe(true);
    expect(validateEG("20 11 1234 5678")).toBe(true);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateEG("01312345678")).toBe(false); // 013 not valid
    expect(validateEG("01412345678")).toBe(false); // 014 not valid
    expect(validateEG("01612345678")).toBe(false); // 016 not valid
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateEG("010123456")).toBe(false); // too short
    expect(validateEG("0101234567890")).toBe(false); // too long
    expect(validateEG("010")).toBe(false);
    expect(validateEG("")).toBe(false);
  });

  test("should accept Egyptian landline numbers", () => {
    expect(validateEG("0212345678")).toBe(true); // landline (Cairo)
    expect(validateEG("031234567")).toBe(true); // landline (Alexandria)
  });

  test("should reject invalid Egyptian numbers", () => {
    expect(validateEG("1012345678")).toBe(false); // missing leading 0
  });
});

