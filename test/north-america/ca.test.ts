import { describe, test, expect } from "vitest";
import { validateCA } from "../../src/validators/north-america/ca";

describe("validateCA - Canadian phone numbers", () => {
  test("should accept valid Canadian phone numbers", () => {
    expect(validateCA("4162345678").isValid).toBe(true); // Toronto (exchange starts with 2)
    expect(validateCA("6045551234").isValid).toBe(true); // Vancouver
    expect(validateCA("5143450123").isValid).toBe(true); // Montreal
    expect(validateCA("4035551234").isValid).toBe(true); // Calgary
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCA("14162345678").isValid).toBe(true);
    expect(validateCA("1-416-234-5678").isValid).toBe(true);
    expect(validateCA("+1 416 234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCA("416-234-5678").isValid).toBe(true);
    expect(validateCA("(416) 234-5678").isValid).toBe(true);
    expect(validateCA("416.234.5678").isValid).toBe(true);
    expect(validateCA("416 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid area code", () => {
    expect(validateCA("0161234567").isValid).toBe(false); // starts with 0
    expect(validateCA("1161234567").isValid).toBe(false); // starts with 1
  });

  test("should reject phone numbers with invalid exchange code", () => {
    expect(validateCA("4160234567").isValid).toBe(false); // exchange starts with 0
    expect(validateCA("4161234567").isValid).toBe(false); // exchange starts with 1
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCA("416123456").isValid).toBe(false); // too short
    expect(validateCA("41612345678").isValid).toBe(false); // too long
    expect(validateCA("416").isValid).toBe(false);
    expect(validateCA("").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateCA("416123456a").isValid).toBe(false);
    expect(validateCA("a161234567").isValid).toBe(false);
  });
});
