import { describe, test, expect } from "vitest";
import { validateER } from "../../src/validators/africa/er";

describe("validateER - Eritrea phone numbers", () => {
  test("should accept valid Eritrea phone numbers", () => {
    expect(validateER("7 123 456").isValid).toBe(true);
    expect(validateER("1 123 456").isValid).toBe(true);
  });

  test("should accept international format (+291)", () => {
    expect(validateER("+291 7 123 456").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateER("9 123 456").isValid).toBe(false);
    expect(validateER("").isValid).toBe(false);
  });
});

