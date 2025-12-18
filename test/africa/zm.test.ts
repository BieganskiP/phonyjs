import { describe, test, expect } from "vitest";
import { validateZM } from "../../src/validators/africa/zm";

describe("validateZM - Zambia phone numbers", () => {
  test("should accept valid Zambia phone numbers", () => {
    expect(validateZM("97 123 4567").isValid).toBe(true);
    expect(validateZM("21 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+260)", () => {
    expect(validateZM("+260 97 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateZM("17 123 4567").isValid).toBe(false);
    expect(validateZM("").isValid).toBe(false);
  });
});

