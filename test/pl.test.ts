import { describe, test, expect } from "vitest";
import { validatePL } from "../src/validators/pl";

describe("validatePL - Polish phone numbers", () => {
  test("should accept valid 9-digit Polish mobile numbers", () => {
    expect(validatePL("500123456")).toBe(true); // starts with 5
    expect(validatePL("600123456")).toBe(true); // starts with 6
    expect(validatePL("700123456")).toBe(true); // starts with 7
    expect(validatePL("800123456")).toBe(true); // starts with 8
    expect(validatePL("456789012")).toBe(true); // starts with 4
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validatePL("500 123 456")).toBe(true);
    expect(validatePL("600-123-456")).toBe(true);
    expect(validatePL("+48 700 123 456")).toBe(true);
    expect(validatePL("(800) 123-456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePL("12345678")).toBe(false); // too short
    expect(validatePL("1234567890")).toBe(false); // too long
    expect(validatePL("123")).toBe(false);
    expect(validatePL("")).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validatePL("abc def ghi")).toBe(false);
    expect(validatePL("---")).toBe(false);
    expect(validatePL("   ")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validatePL("50012345a")).toBe(false);
    expect(validatePL("a00123456")).toBe(false);
  });

  test("should reject numbers starting with invalid digits", () => {
    expect(validatePL("123456789")).toBe(false); // starts with 1 (landline)
    expect(validatePL("223456789")).toBe(false); // starts with 2 (landline)
    expect(validatePL("323456789")).toBe(false); // starts with 3 (landline)
    expect(validatePL("923456789")).toBe(false); // starts with 9 (special services)
    expect(validatePL("023456789")).toBe(false); // starts with 0
  });
});
