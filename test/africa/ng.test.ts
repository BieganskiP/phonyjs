import { describe, test, expect } from "vitest";
import { validateNG } from "../../src/validators/africa/ng";

describe("validateNG - Nigeria phone numbers", () => {
  test("should accept valid Nigeria mobile numbers", () => {
    expect(validateNG("803 123 4567").isValid).toBe(true);
    expect(validateNG("810 123 4567").isValid).toBe(true);
    expect(validateNG("901 123 4567").isValid).toBe(true);
  });

  test("should accept Nigeria landline numbers", () => {
    expect(validateNG("1 234 5678").isValid).toBe(true); // Lagos
  });

  test("should accept international format (+234)", () => {
    expect(validateNG("+234 803 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateNG("603 123 4567").isValid).toBe(false);
    expect(validateNG("").isValid).toBe(false);
  });
});

