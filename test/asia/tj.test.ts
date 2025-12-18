import { describe, test, expect } from "vitest";
import { validateTJ } from "../../src/validators/asia/tj";

describe("validateTJ - Tajikistan phone numbers", () => {
  test("should accept valid Tajikistan mobile numbers", () => {
    expect(validateTJ("90 123 45 67").isValid).toBe(true);
    expect(validateTJ("91 123 45 67").isValid).toBe(true);
    expect(validateTJ("92 123 45 67").isValid).toBe(true);
    expect(validateTJ("93 123 45 67").isValid).toBe(true);
    expect(validateTJ("95 123 45 67").isValid).toBe(true);
    expect(validateTJ("98 123 45 67").isValid).toBe(true);
  });

  test("should accept Tajikistan landline numbers", () => {
    expect(validateTJ("37 222 33 44").isValid).toBe(true); // Dushanbe
    expect(validateTJ("34 222 33 44").isValid).toBe(true); // Khujand
    expect(validateTJ("35 222 33 44").isValid).toBe(true); // Kulob
    expect(validateTJ("32 222 33 44").isValid).toBe(true); // Khorugh
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTJ("90 123 45 67").isValid).toBe(true);
    expect(validateTJ("90-123-45-67").isValid).toBe(true);
    expect(validateTJ("37 222 33 44").isValid).toBe(true);
  });

  test("should accept international format (+992)", () => {
    expect(validateTJ("+992 90 123 45 67").isValid).toBe(true);
    expect(validateTJ("+992 37 222 33 44").isValid).toBe(true);
    expect(validateTJ("992 90 123 45 67").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTJ("90 123 45 6").isValid).toBe(false);
    expect(validateTJ("90 123 45 678").isValid).toBe(false);
    expect(validateTJ("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTJ("10 123 45 67").isValid).toBe(false);
    expect(validateTJ("94 123 45 67").isValid).toBe(false); // 94 not valid
    expect(validateTJ("96 123 45 67").isValid).toBe(false); // 96 not valid
    expect(validateTJ("97 123 45 67").isValid).toBe(false); // 97 not valid
  });
});




