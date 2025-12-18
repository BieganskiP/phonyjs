import { describe, test, expect } from "vitest";
import { validateSO } from "../../src/validators/africa/so";

describe("validateSO - Somalia phone numbers", () => {
  test("should accept valid Somalia phone numbers", () => {
    expect(validateSO("61 123 4567").isValid).toBe(true);
    expect(validateSO("1 234 567").isValid).toBe(true);
  });

  test("should accept international format (+252)", () => {
    expect(validateSO("+252 61 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateSO("00 123 45").isValid).toBe(false);
    expect(validateSO("").isValid).toBe(false);
  });
});

