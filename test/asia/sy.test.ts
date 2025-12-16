import { describe, test, expect } from "vitest";
import { validateSY } from "../../src/validators/asia/sy";

describe("validateSY - Syrian phone numbers", () => {
  test("should accept valid Syrian mobile numbers", () => {
    expect(validateSY("0912 345 678").isValid).toBe(true);
    expect(validateSY("0933 123 456").isValid).toBe(true);
    expect(validateSY("0944 567 890").isValid).toBe(true);
  });

  test("should accept valid Syrian landline numbers", () => {
    expect(validateSY("011 123 4567").isValid).toBe(true);
    expect(validateSY("021 123 4567").isValid).toBe(true);
    expect(validateSY("031 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSY("0912 345 678").isValid).toBe(true);
    expect(validateSY("0912-345-678").isValid).toBe(true);
    expect(validateSY("+963 912 345 678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSY("0912 345 67").isValid).toBe(false); // too short
    expect(validateSY("0912 345 6789").isValid).toBe(false); // too long
    expect(validateSY("123").isValid).toBe(false);
    expect(validateSY("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateSY("912345678").isValid).toBe(false);
  });
});

