import { describe, test, expect } from "vitest";
import { validateZW } from "../../src/validators/africa/zw";

describe("validateZW - Zimbabwe phone numbers", () => {
  test("should accept valid Zimbabwe phone numbers", () => {
    expect(validateZW("71 234 5678").isValid).toBe(true);
    expect(validateZW("24 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+263)", () => {
    expect(validateZW("+263 71 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateZW("11 123 4567").isValid).toBe(false);
    expect(validateZW("").isValid).toBe(false);
  });
});

