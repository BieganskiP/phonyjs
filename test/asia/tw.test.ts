import { describe, test, expect } from "vitest";
import { validateTW } from "../../src/validators/asia/tw";

describe("validateTW - Taiwanese phone numbers", () => {
  test("should accept valid Taiwanese mobile numbers", () => {
    expect(validateTW("0912 345 678").isValid).toBe(true);
    expect(validateTW("0987 654 321").isValid).toBe(true);
    expect(validateTW("0966 123 456").isValid).toBe(true);
  });

  test("should accept valid Taiwanese landline numbers", () => {
    expect(validateTW("02 1234 5678").isValid).toBe(true);
    expect(validateTW("04 1234 5678").isValid).toBe(true);
    expect(validateTW("07 1234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateTW("0912 345 678").isValid).toBe(true);
    expect(validateTW("0912-345-678").isValid).toBe(true);
    expect(validateTW("+886 912 345 678").isValid).toBe(true);
    expect(validateTW("00886 912 345 678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTW("0912 345 67").isValid).toBe(false); // too short
    expect(validateTW("0912 345 6789").isValid).toBe(false); // too long
    expect(validateTW("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateTW("0900 123 456").isValid).toBe(false);
    expect(validateTW("0940 123 456").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateTW("0912 345 67a").isValid).toBe(false);
    expect(validateTW("abc def ghi").isValid).toBe(false);
  });
});

