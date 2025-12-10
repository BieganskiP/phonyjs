import { describe, test, expect } from "vitest";
import { validateDK } from "../src/validators/dk";

describe("validateDK - Danish phone numbers", () => {
  test("should accept valid Danish phone numbers", () => {
    expect(validateDK("12 34 56 78").isValid).toBe(true);
    expect(validateDK("98 76 54 32").isValid).toBe(true);
    expect(validateDK("20 12 34 56").isValid).toBe(true);
  });

  test("should accept phone numbers with various formatting", () => {
    expect(validateDK("12 34 56 78").isValid).toBe(true);
    expect(validateDK("12-34-56-78").isValid).toBe(true);
    expect(validateDK("12345678").isValid).toBe(true);
  });

  test("should accept international format (+45)", () => {
    expect(validateDK("+45 12 34 56 78").isValid).toBe(true);
    expect(validateDK("45 12 34 56 78").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateDK("12 34 56 7").isValid).toBe(false);
    expect(validateDK("12 34 56 789").isValid).toBe(false);
    expect(validateDK("123456").isValid).toBe(false);
    expect(validateDK("").isValid).toBe(false);
  });

  test("should accept all 8-digit numbers", () => {
    expect(validateDK("11111111").isValid).toBe(true);
    expect(validateDK("99999999").isValid).toBe(true);
  });
});





