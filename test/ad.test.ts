import { describe, test, expect } from "vitest";
import { validateAD } from "../src/validators/ad";

describe("validateAD - Andorran phone numbers", () => {
  test("should accept valid 6-digit Andorran phone numbers", () => {
    expect(validateAD("812 345").isValid).toBe(true);
    expect(validateAD("612 345").isValid).toBe(true);
    expect(validateAD("812345").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateAD("812 345").isValid).toBe(true);
    expect(validateAD("812-345").isValid).toBe(true);
    expect(validateAD("+376 812 345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAD("81234").isValid).toBe(false); // too short
    expect(validateAD("8123456").isValid).toBe(false); // too long
    expect(validateAD("123").isValid).toBe(false);
    expect(validateAD("").isValid).toBe(false);
  });

  test("should reject numbers not starting with 6 or 8", () => {
    expect(validateAD("712345").isValid).toBe(false);
    expect(validateAD("012345").isValid).toBe(false);
  });
});

