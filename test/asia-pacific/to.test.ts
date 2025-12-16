import { describe, test, expect } from "vitest";
import { validateTO } from "../../src/validators/asia-pacific/to";

describe("validateTO - Tongan phone numbers", () => {
  test("should accept valid Tongan phone numbers", () => {
    expect(validateTO("12345").isValid).toBe(true);
    expect(validateTO("123456").isValid).toBe(true);
    expect(validateTO("123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateTO("123-45").isValid).toBe(true);
    expect(validateTO("+676 12345").isValid).toBe(true);
    expect(validateTO("00676 12345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTO("1234").isValid).toBe(false); // too short
    expect(validateTO("12345678").isValid).toBe(false); // too long
    expect(validateTO("123").isValid).toBe(false);
    expect(validateTO("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateTO("1234a").isValid).toBe(false);
    expect(validateTO("abc de").isValid).toBe(false);
  });
});

