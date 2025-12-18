import { describe, test, expect } from "vitest";
import { validateCG } from "../../src/validators/africa/cg";

describe("validateCG - Republic of the Congo phone numbers", () => {
  test("should accept valid Congo phone numbers", () => {
    expect(validateCG("06 123 45 67").isValid).toBe(true);
    expect(validateCG("22 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+242)", () => {
    expect(validateCG("+242 06 123 45 67").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateCG("16 123 45 67").isValid).toBe(false);
    expect(validateCG("").isValid).toBe(false);
  });
});

