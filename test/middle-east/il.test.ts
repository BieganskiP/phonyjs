import { describe, test, expect } from "vitest";
import { validateIL } from "../../src/validators/middle-east/il";

describe("validateIL - Israeli phone numbers", () => {
  test("should accept valid Israeli mobile numbers", () => {
    expect(validateIL("050 123 4567").isValid).toBe(true);
    expect(validateIL("052 123 4567").isValid).toBe(true);
    expect(validateIL("054 123 4567").isValid).toBe(true);
  });

  test("should accept valid Israeli landline numbers", () => {
    expect(validateIL("02-123-4567").isValid).toBe(true);
    expect(validateIL("03-123-4567").isValid).toBe(true);
    expect(validateIL("04-123-4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateIL("050 123 4567").isValid).toBe(true);
    expect(validateIL("050-123-4567").isValid).toBe(true);
    expect(validateIL("+972 50-123-4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIL("050 123 456").isValid).toBe(false); // too short
    expect(validateIL("050 123 45678").isValid).toBe(false); // too long
    expect(validateIL("123").isValid).toBe(false);
    expect(validateIL("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateIL("501234567").isValid).toBe(false);
  });
});

