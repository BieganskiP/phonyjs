import { describe, test, expect } from "vitest";
import { validatePL } from "../src/validators/pl";

describe("validatePL - Polish phone numbers", () => {
  test("should accept valid 9-digit Polish mobile numbers", () => {
    expect(validatePL("500123456").isValid).toBe(true); // starts with 5
    expect(validatePL("600123456").isValid).toBe(true); // starts with 6
    expect(validatePL("700123456").isValid).toBe(true); // starts with 7
    expect(validatePL("800123456").isValid).toBe(true); // starts with 8
    expect(validatePL("456789012").isValid).toBe(true); // starts with 4
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validatePL("500 123 456").isValid).toBe(true);
    expect(validatePL("600-123-456").isValid).toBe(true);
    expect(validatePL("+48 700 123 456").isValid).toBe(true);
    expect(validatePL("(800) 123-456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePL("12345678").isValid).toBe(false); // too short
    expect(validatePL("1234567890").isValid).toBe(false); // too long
    expect(validatePL("123").isValid).toBe(false);
    expect(validatePL("").isValid).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validatePL("abc def ghi").isValid).toBe(false);
    expect(validatePL("---").isValid).toBe(false);
    expect(validatePL("   ").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validatePL("50012345a").isValid).toBe(false);
    expect(validatePL("a00123456").isValid).toBe(false);
  });

  test("should accept Polish landline numbers", () => {
    expect(validatePL("123456789").isValid).toBe(true); // landline with area code 12
    expect(validatePL("223456789").isValid).toBe(true); // landline with area code 22
    expect(validatePL("323456789").isValid).toBe(true); // landline with area code 32
  });

  test("should reject numbers starting with invalid digits", () => {
    expect(validatePL("923456789").isValid).toBe(false); // starts with 9 (special services)
    expect(validatePL("023456789").isValid).toBe(false); // starts with 0
  });
});




