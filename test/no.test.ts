import { describe, test, expect } from "vitest";
import { validateNO } from "../src/validators/no";

describe("validateNO - Norwegian phone numbers", () => {
  test("should accept valid 8-digit Norwegian phone numbers", () => {
    expect(validateNO("21 23 45 67").isValid).toBe(true);
    expect(validateNO("412 34 567").isValid).toBe(true);
    expect(validateNO("912 34 567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateNO("21 23 45 67").isValid).toBe(true);
    expect(validateNO("21-23-45-67").isValid).toBe(true);
    expect(validateNO("+47 21 23 45 67").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateNO("21 23 45 6").isValid).toBe(false); // too short
    expect(validateNO("21 23 45 67 8").isValid).toBe(false); // too long
    expect(validateNO("123").isValid).toBe(false);
    expect(validateNO("").isValid).toBe(false);
  });

  test("should reject numbers starting with 0 or 1", () => {
    expect(validateNO("01234567").isValid).toBe(false);
    expect(validateNO("11234567").isValid).toBe(false);
  });
});

