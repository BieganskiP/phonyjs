import { describe, test, expect } from "vitest";
import { validateMU } from "../../src/validators/africa/mu";

describe("validateMU - Mauritius phone numbers", () => {
  test("should accept valid Mauritius phone numbers", () => {
    expect(validateMU("5 123 4567").isValid).toBe(true);
    expect(validateMU("2 123 456").isValid).toBe(true);
  });

  test("should accept international format (+230)", () => {
    expect(validateMU("+230 5 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateMU("9 123 4567").isValid).toBe(false);
    expect(validateMU("").isValid).toBe(false);
  });
});

