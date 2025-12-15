import { describe, test, expect } from "vitest";
import { validateLI } from "../../src/validators/europe/li";

describe("validateLI - Liechtenstein phone numbers", () => {
  test("should accept valid 7-digit Liechtenstein phone numbers", () => {
    expect(validateLI("234 56 78").isValid).toBe(true);
    expect(validateLI("123 4567").isValid).toBe(true);
    expect(validateLI("2345678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateLI("234 56 78").isValid).toBe(true);
    expect(validateLI("234-56-78").isValid).toBe(true);
    expect(validateLI("+423 234 56 78").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLI("234567").isValid).toBe(false); // too short
    expect(validateLI("23456789").isValid).toBe(false); // too long
    expect(validateLI("123").isValid).toBe(false);
    expect(validateLI("").isValid).toBe(false);
  });
});

