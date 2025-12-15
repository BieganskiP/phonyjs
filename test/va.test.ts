import { describe, test, expect } from "vitest";
import { validateVA } from "../src/validators/va";

describe("validateVA - Vatican City phone numbers", () => {
  test("should accept valid Vatican City phone numbers", () => {
    expect(validateVA("06 698 1234").isValid).toBe(true);
    expect(validateVA("123 456").isValid).toBe(true);
    expect(validateVA("1234567890").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateVA("06 698 1234").isValid).toBe(true);
    expect(validateVA("06-698-1234").isValid).toBe(true);
    expect(validateVA("+39 06 698 1234").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateVA("12345").isValid).toBe(false); // too short
    expect(validateVA("12345678901").isValid).toBe(false); // too long
    expect(validateVA("123").isValid).toBe(false);
    expect(validateVA("").isValid).toBe(false);
  });
});

