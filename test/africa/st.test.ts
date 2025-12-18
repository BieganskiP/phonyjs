import { describe, test, expect } from "vitest";
import { validateST } from "../../src/validators/africa/st";

describe("validateST - São Tomé and Príncipe phone numbers", () => {
  test("should accept valid São Tomé phone numbers", () => {
    expect(validateST("991 23 45").isValid).toBe(true);
    expect(validateST("222 34 56").isValid).toBe(true);
    expect(validateST("881 23 45").isValid).toBe(true);
  });

  test("should accept international format (+239)", () => {
    expect(validateST("+239 991 23 45").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateST("111 23 45").isValid).toBe(false);
    expect(validateST("").isValid).toBe(false);
  });
});

