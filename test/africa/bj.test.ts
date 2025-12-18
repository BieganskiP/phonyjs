import { describe, test, expect } from "vitest";
import { validateBJ } from "../../src/validators/africa/bj";

describe("validateBJ - Benin phone numbers", () => {
  test("should accept valid Benin mobile numbers", () => {
    expect(validateBJ("97 12 34 56").isValid).toBe(true);
    expect(validateBJ("96 12 34 56").isValid).toBe(true);
    expect(validateBJ("51 12 34 56").isValid).toBe(true);
  });

  test("should accept Benin landline numbers", () => {
    expect(validateBJ("21 12 34 56").isValid).toBe(true);
  });

  test("should accept international format (+229)", () => {
    expect(validateBJ("+229 97 12 34 56").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateBJ("97 12 34 5").isValid).toBe(false);
    expect(validateBJ("").isValid).toBe(false);
  });
});

