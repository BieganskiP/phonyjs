import { describe, test, expect } from "vitest";
import { validateGW } from "../../src/validators/africa/gw";

describe("validateGW - Guinea-Bissau phone numbers", () => {
  test("should accept valid Guinea-Bissau phone numbers", () => {
    expect(validateGW("955 12 34").isValid).toBe(true);
    expect(validateGW("665 12 34").isValid).toBe(true);
    expect(validateGW("321 23 45").isValid).toBe(true);
  });

  test("should accept international format (+245)", () => {
    expect(validateGW("+245 955 12 34").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateGW("955 12 3").isValid).toBe(false);
    expect(validateGW("").isValid).toBe(false);
  });
});

