import { describe, test, expect } from "vitest";
import { validateSM } from "../src/validators/sm";

describe("validateSM - San Marinese phone numbers", () => {
  test("should accept valid 6-digit San Marinese phone numbers", () => {
    expect(validateSM("123 456").isValid).toBe(true);
    expect(validateSM("0549 88 88 88").isValid).toBe(true);
    expect(validateSM("123456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateSM("123 456").isValid).toBe(true);
    expect(validateSM("123-456").isValid).toBe(true);
    expect(validateSM("+378 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSM("12345").isValid).toBe(false); // too short
    expect(validateSM("1234567").isValid).toBe(false); // too long
    expect(validateSM("123").isValid).toBe(false);
    expect(validateSM("").isValid).toBe(false);
  });
});

