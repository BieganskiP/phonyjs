import { describe, test, expect } from "vitest";
import { validateGH } from "../../src/validators/africa/gh";

describe("validateGH - Ghana phone numbers", () => {
  test("should accept valid Ghana mobile numbers", () => {
    expect(validateGH("24 123 4567").isValid).toBe(true);
    expect(validateGH("54 123 4567").isValid).toBe(true);
    expect(validateGH("20 123 4567").isValid).toBe(true);
  });

  test("should accept Ghana landline numbers", () => {
    expect(validateGH("30 212 3456").isValid).toBe(true);
  });

  test("should accept international format (+233)", () => {
    expect(validateGH("+233 24 123 4567").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateGH("24 123 456").isValid).toBe(false);
    expect(validateGH("").isValid).toBe(false);
  });
});

