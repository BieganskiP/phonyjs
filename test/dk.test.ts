import { describe, test, expect } from "vitest";
import { validateDK } from "../src/validators/dk";

describe("validateDK - Danish phone numbers", () => {
  test("should accept valid Danish phone numbers", () => {
    expect(validateDK("12 34 56 78")).toBe(true);
    expect(validateDK("98 76 54 32")).toBe(true);
    expect(validateDK("20 12 34 56")).toBe(true);
  });

  test("should accept phone numbers with various formatting", () => {
    expect(validateDK("12 34 56 78")).toBe(true);
    expect(validateDK("12-34-56-78")).toBe(true);
    expect(validateDK("12345678")).toBe(true);
  });

  test("should accept international format (+45)", () => {
    expect(validateDK("+45 12 34 56 78")).toBe(true);
    expect(validateDK("45 12 34 56 78")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateDK("12 34 56 7")).toBe(false);
    expect(validateDK("12 34 56 789")).toBe(false);
    expect(validateDK("123456")).toBe(false);
    expect(validateDK("")).toBe(false);
  });

  test("should accept all 8-digit numbers", () => {
    expect(validateDK("11111111")).toBe(true);
    expect(validateDK("99999999")).toBe(true);
  });
});

