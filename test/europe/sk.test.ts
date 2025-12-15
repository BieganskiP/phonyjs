import { describe, test, expect } from "vitest";
import { validateSK } from "../../src/validators/europe/sk";

describe("validateSK - Slovak phone numbers", () => {
  test("should accept valid Slovak mobile numbers", () => {
    expect(validateSK("0912 123 456").isValid).toBe(true);
    expect(validateSK("0944 123 456").isValid).toBe(true);
  });

  test("should accept valid Slovak landline numbers", () => {
    expect(validateSK("02/123 456 78").isValid).toBe(true);
    expect(validateSK("031 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSK("02/123 456 78").isValid).toBe(true);
    expect(validateSK("02-123-456-78").isValid).toBe(true);
    expect(validateSK("+421 2 123 456 78").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSK("02 123 456").isValid).toBe(false); // too short
    expect(validateSK("0912 123 4567").isValid).toBe(false); // too long
    expect(validateSK("123").isValid).toBe(false);
    expect(validateSK("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateSK("212345678").isValid).toBe(false);
  });
});

