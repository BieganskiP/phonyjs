import { describe, test, expect } from "vitest";
import { validateNP } from "../src/validators/np";

describe("validateNP - Nepali phone numbers", () => {
  test("should accept valid Nepali mobile numbers", () => {
    expect(validateNP("9841 234 567").isValid).toBe(true);
    expect(validateNP("9851 234 567").isValid).toBe(true);
    expect(validateNP("9801 234 567").isValid).toBe(true);
  });

  test("should accept Nepali landline numbers", () => {
    expect(validateNP("01 234 5678").isValid).toBe(true); // Kathmandu
    expect(validateNP("061 234 567").isValid).toBe(true); // Pokhara
    expect(validateNP("021 234 567").isValid).toBe(true); // Biratnagar
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateNP("9841 234 567").isValid).toBe(true);
    expect(validateNP("9841-234-567").isValid).toBe(true);
    expect(validateNP("01 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+977)", () => {
    expect(validateNP("+977 9841 234 567").isValid).toBe(true);
    expect(validateNP("+977 1 234 5678").isValid).toBe(true);
    expect(validateNP("977 9841 234 567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateNP("9841 234 56").isValid).toBe(false);
    expect(validateNP("9841 234 5678").isValid).toBe(false);
    expect(validateNP("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateNP("8841 234 567").isValid).toBe(false);
    expect(validateNP("9941 234 567").isValid).toBe(false);
  });
});





