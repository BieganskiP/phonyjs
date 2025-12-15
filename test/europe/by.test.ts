import { describe, test, expect } from "vitest";
import { validateBY } from "../../src/validators/europe/by";

describe("validateBY - Belarusian phone numbers", () => {
  test("should accept valid Belarusian phone numbers", () => {
    expect(validateBY("17 123 4567").isValid).toBe(true);
    expect(validateBY("29 123 4567").isValid).toBe(true);
    expect(validateBY("123456789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateBY("17 123 4567").isValid).toBe(true);
    expect(validateBY("17-123-4567").isValid).toBe(true);
    expect(validateBY("+375 17 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBY("12345678").isValid).toBe(false); // too short
    expect(validateBY("1234567890").isValid).toBe(false); // too long
    expect(validateBY("123").isValid).toBe(false);
    expect(validateBY("").isValid).toBe(false);
  });

  test("should reject numbers starting with 0", () => {
    expect(validateBY("012345678").isValid).toBe(false);
  });
});

