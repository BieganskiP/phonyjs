import { describe, test, expect } from "vitest";
import { validatePS } from "../src/validators/ps";

describe("validatePS - Palestinian phone numbers", () => {
  test("should accept valid Palestinian mobile numbers", () => {
    expect(validatePS("059 123 4567").isValid).toBe(true);
    expect(validatePS("056 123 4567").isValid).toBe(true);
    expect(validatePS("057 123 4567").isValid).toBe(true);
  });

  test("should accept valid Palestinian landline numbers", () => {
    expect(validatePS("02 123 4567").isValid).toBe(true);
    expect(validatePS("04 123 4567").isValid).toBe(true);
    expect(validatePS("09 123 45678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validatePS("059 123 4567").isValid).toBe(true);
    expect(validatePS("059-123-4567").isValid).toBe(true);
    expect(validatePS("+970 59 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePS("059 123 45").isValid).toBe(false); // too short (8 digits)
    expect(validatePS("059 123 45678").isValid).toBe(false); // too long (10 digits)
    expect(validatePS("123").isValid).toBe(false);
    expect(validatePS("").isValid).toBe(false);
  });

  test("should reject mobile numbers with invalid prefixes", () => {
    expect(validatePS("055 123 4567").isValid).toBe(false); // invalid mobile prefix
    expect(validatePS("058 123 4567").isValid).toBe(false); // invalid mobile prefix
  });

  test("should reject numbers without leading zero", () => {
    expect(validatePS("591234567").isValid).toBe(false);
  });
});

