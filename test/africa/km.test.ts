import { describe, test, expect } from "vitest";
import { validateKM } from "../../src/validators/africa/km";

describe("validateKM - Comoros phone numbers", () => {
  test("should accept valid Comoros phone numbers", () => {
    expect(validateKM("321 23 45").isValid).toBe(true);
    expect(validateKM("771 23 45").isValid).toBe(true);
  });

  test("should accept international format (+269)", () => {
    expect(validateKM("+269 321 23 45").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateKM("121 23 45").isValid).toBe(false);
    expect(validateKM("").isValid).toBe(false);
  });
});

