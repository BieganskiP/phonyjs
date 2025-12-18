import { describe, test, expect } from "vitest";
import { validateGN } from "../../src/validators/africa/gn";

describe("validateGN - Guinea phone numbers", () => {
  test("should accept valid Guinea mobile numbers", () => {
    expect(validateGN("621 12 34 56").isValid).toBe(true);
    expect(validateGN("655 12 34 56").isValid).toBe(true);
  });

  test("should accept Guinea landline numbers", () => {
    expect(validateGN("302 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+224)", () => {
    expect(validateGN("+224 621 12 34 56").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateGN("621 12 34 5").isValid).toBe(false);
    expect(validateGN("").isValid).toBe(false);
  });
});

