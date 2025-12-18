import { describe, test, expect } from "vitest";
import { validateGQ } from "../../src/validators/africa/gq";

describe("validateGQ - Equatorial Guinea phone numbers", () => {
  test("should accept valid Equatorial Guinea phone numbers", () => {
    expect(validateGQ("222 123 456").isValid).toBe(true);
    expect(validateGQ("555 123 456").isValid).toBe(true);
    expect(validateGQ("333 123 456").isValid).toBe(true);
  });

  test("should accept international format (+240)", () => {
    expect(validateGQ("+240 222 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateGQ("111 123 456").isValid).toBe(false);
    expect(validateGQ("").isValid).toBe(false);
  });
});

