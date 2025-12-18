import { describe, test, expect } from "vitest";
import { validateSC } from "../../src/validators/africa/sc";

describe("validateSC - Seychelles phone numbers", () => {
  test("should accept valid Seychelles phone numbers", () => {
    expect(validateSC("2 512 345").isValid).toBe(true);
    expect(validateSC("4 123 456").isValid).toBe(true);
  });

  test("should accept international format (+248)", () => {
    expect(validateSC("+248 2 512 345").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateSC("1 512 345").isValid).toBe(false);
    expect(validateSC("").isValid).toBe(false);
  });
});

