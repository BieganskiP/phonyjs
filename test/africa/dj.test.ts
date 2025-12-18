import { describe, test, expect } from "vitest";
import { validateDJ } from "../../src/validators/africa/dj";

describe("validateDJ - Djibouti phone numbers", () => {
  test("should accept valid Djibouti phone numbers", () => {
    expect(validateDJ("77 12 34 56").isValid).toBe(true);
    expect(validateDJ("21 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+253)", () => {
    expect(validateDJ("+253 77 12 34 56").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateDJ("17 12 34 56").isValid).toBe(false);
    expect(validateDJ("").isValid).toBe(false);
  });
});

