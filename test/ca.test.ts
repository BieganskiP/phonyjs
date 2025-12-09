import { describe, test, expect } from "vitest";
import { validateCA } from "../src/validators/ca";

describe("validateCA - Canadian phone numbers", () => {
  test("should accept valid Canadian phone numbers", () => {
    expect(validateCA("4162345678")).toBe(true); // Toronto (exchange starts with 2)
    expect(validateCA("6045551234")).toBe(true); // Vancouver
    expect(validateCA("5143450123")).toBe(true); // Montreal
    expect(validateCA("4035551234")).toBe(true); // Calgary
  });

  test("should accept phone numbers with country code", () => {
    expect(validateCA("14162345678")).toBe(true);
    expect(validateCA("1-416-234-5678")).toBe(true);
    expect(validateCA("+1 416 234 5678")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCA("416-234-5678")).toBe(true);
    expect(validateCA("(416) 234-5678")).toBe(true);
    expect(validateCA("416.234.5678")).toBe(true);
    expect(validateCA("416 234 5678")).toBe(true);
  });

  test("should reject phone numbers with invalid area code", () => {
    expect(validateCA("0161234567")).toBe(false); // starts with 0
    expect(validateCA("1161234567")).toBe(false); // starts with 1
  });

  test("should reject phone numbers with invalid exchange code", () => {
    expect(validateCA("4160234567")).toBe(false); // exchange starts with 0
    expect(validateCA("4161234567")).toBe(false); // exchange starts with 1
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCA("416123456")).toBe(false); // too short
    expect(validateCA("41612345678")).toBe(false); // too long
    expect(validateCA("416")).toBe(false);
    expect(validateCA("")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateCA("416123456a")).toBe(false);
    expect(validateCA("a161234567")).toBe(false);
  });
});

