import { describe, test, expect } from "vitest";
import { validatePT } from "../../src/validators/europe/pt";

describe("validatePT - Portuguese phone numbers", () => {
  test("should accept valid 9-digit Portuguese mobile numbers", () => {
    expect(validatePT("912 345 678").isValid).toBe(true);
    expect(validatePT("923 456 789").isValid).toBe(true);
  });

  test("should accept valid 9-digit Portuguese landline numbers", () => {
    expect(validatePT("212 345 678").isValid).toBe(true);
    expect(validatePT("223 456 789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validatePT("912 345 678").isValid).toBe(true);
    expect(validatePT("912-345-678").isValid).toBe(true);
    expect(validatePT("+351 912 345 678").isValid).toBe(true);
    expect(validatePT("(912) 345-678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePT("12345678").isValid).toBe(false); // too short
    expect(validatePT("1234567890").isValid).toBe(false); // too long
    expect(validatePT("123").isValid).toBe(false);
    expect(validatePT("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid starting digits", () => {
    expect(validatePT("112 345 678").isValid).toBe(false); // doesn't start with 2 or 9
    expect(validatePT("012 345 678").isValid).toBe(false);
  });
});

