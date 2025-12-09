import { describe, test, expect } from "vitest";
import { validateUS } from "../src/validators/us";

describe("validateUS - US phone numbers", () => {
  test("should accept valid US phone numbers", () => {
    expect(validateUS("2125551234")).toBe(true);
    expect(validateUS("3105551234")).toBe(true);
    expect(validateUS("9175551234")).toBe(true);
  });

  test("should accept phone numbers with country code", () => {
    expect(validateUS("12125551234")).toBe(true);
    expect(validateUS("1-212-555-1234")).toBe(true);
    expect(validateUS("+1 212 555 1234")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateUS("212-555-1234")).toBe(true);
    expect(validateUS("(212) 555-1234")).toBe(true);
    expect(validateUS("212.555.1234")).toBe(true);
    expect(validateUS("212 555 1234")).toBe(true);
  });

  test("should reject phone numbers with invalid area code", () => {
    expect(validateUS("0125551234")).toBe(false); // starts with 0
    expect(validateUS("1125551234")).toBe(false); // starts with 1
  });

  test("should reject phone numbers with invalid exchange code", () => {
    expect(validateUS("2120551234")).toBe(false); // exchange starts with 0
    expect(validateUS("2121551234")).toBe(false); // exchange starts with 1
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateUS("212555123")).toBe(false); // too short
    expect(validateUS("21255512345")).toBe(false); // too long
    expect(validateUS("123")).toBe(false);
    expect(validateUS("")).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validateUS("abc-def-ghij")).toBe(false);
    expect(validateUS("----------")).toBe(false);
  });
});

