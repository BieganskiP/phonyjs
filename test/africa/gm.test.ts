import { describe, test, expect } from "vitest";
import { validateGM } from "../../src/validators/africa/gm";

describe("validateGM - Gambia phone numbers", () => {
  test("should accept valid Gambia mobile numbers", () => {
    expect(validateGM("991 23 45").isValid).toBe(true);
    expect(validateGM("771 23 45").isValid).toBe(true);
    expect(validateGM("631 23 45").isValid).toBe(true);
  });

  test("should accept Gambia landline numbers", () => {
    expect(validateGM("421 23 45").isValid).toBe(true);
  });

  test("should accept international format (+220)", () => {
    expect(validateGM("+220 991 23 45").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateGM("991 23 4").isValid).toBe(false);
    expect(validateGM("").isValid).toBe(false);
  });
});

