import { describe, test, expect } from "vitest";
import { validateSE } from "../../src/validators/europe/se";

describe("validateSE - Swedish phone numbers", () => {
  test("should accept valid Swedish mobile numbers", () => {
    expect(validateSE("070-123 45 67").isValid).toBe(true);
    expect(validateSE("071 234 56 78").isValid).toBe(true);
  });

  test("should accept valid Swedish landline numbers", () => {
    expect(validateSE("08-123 456 78").isValid).toBe(true);
    expect(validateSE("031-123 45 67").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSE("08-123 456 78").isValid).toBe(true);
    expect(validateSE("08 123 456 78").isValid).toBe(true);
    expect(validateSE("+46 8-123 456 78").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSE("08-123 45").isValid).toBe(false); // too short
    expect(validateSE("08-123 456 789 012").isValid).toBe(false); // too long
    expect(validateSE("123").isValid).toBe(false);
    expect(validateSE("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateSE("812345678").isValid).toBe(false);
  });
});

