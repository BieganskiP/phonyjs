import { describe, test, expect } from "vitest";
import { validateCD } from "../../src/validators/africa/cd";

describe("validateCD - Democratic Republic of the Congo phone numbers", () => {
  test("should accept valid DRC phone numbers", () => {
    expect(validateCD("81 123 45 67").isValid).toBe(true);
    expect(validateCD("99 123 45 67").isValid).toBe(true);
    expect(validateCD("12 123 45 67").isValid).toBe(true);
  });

  test("should accept international format (+243)", () => {
    expect(validateCD("+243 81 123 45 67").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateCD("31 123 45 67").isValid).toBe(false);
    expect(validateCD("").isValid).toBe(false);
  });
});

