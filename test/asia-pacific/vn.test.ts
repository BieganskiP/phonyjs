import { describe, test, expect } from "vitest";
import { validateVN } from "../../src/validators/asia-pacific/vn";

describe("validateVN - Vietnamese phone numbers", () => {
  test("should accept valid Vietnamese mobile numbers", () => {
    expect(validateVN("0912 345 678").isValid).toBe(true);
    expect(validateVN("0987 654 321").isValid).toBe(true);
    expect(validateVN("0321 234 567").isValid).toBe(true);
  });

  test("should accept valid Vietnamese landline numbers", () => {
    expect(validateVN("024 1234 5678").isValid).toBe(true);
    expect(validateVN("028 1234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateVN("0912 345 678").isValid).toBe(true);
    expect(validateVN("0912-345-678").isValid).toBe(true);
    expect(validateVN("+84 912 345 678").isValid).toBe(true);
    expect(validateVN("0084 912 345 678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateVN("0912 345 67").isValid).toBe(false); // too short
    expect(validateVN("0912 345 6789").isValid).toBe(false); // too long
    expect(validateVN("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateVN("0900 123 456").isValid).toBe(false);
    expect(validateVN("0150 123 456").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateVN("0912 345 67a").isValid).toBe(false);
    expect(validateVN("abc def ghi").isValid).toBe(false);
  });
});

