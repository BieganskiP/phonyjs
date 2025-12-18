import { describe, test, expect } from "vitest";
import { validateMG } from "../../src/validators/africa/mg";

describe("validateMG - Madagascar phone numbers", () => {
  test("should accept valid Madagascar phone numbers", () => {
    expect(validateMG("32 12 345 67").isValid).toBe(true);
    expect(validateMG("20 12 345 67").isValid).toBe(true);
  });

  test("should accept international format (+261)", () => {
    expect(validateMG("+261 32 12 345 67").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateMG("12 12 345 67").isValid).toBe(false);
    expect(validateMG("").isValid).toBe(false);
  });
});

