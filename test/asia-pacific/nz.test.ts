import { describe, test, expect } from "vitest";
import { validateNZ } from "../../src/validators/asia-pacific/nz";

describe("validateNZ - New Zealand phone numbers", () => {
  test("should accept valid New Zealand mobile numbers", () => {
    expect(validateNZ("021 123 4567").isValid).toBe(true);
    expect(validateNZ("027 123 4567").isValid).toBe(true);
    expect(validateNZ("029 123 4567").isValid).toBe(true);
  });

  test("should accept valid New Zealand landline numbers", () => {
    expect(validateNZ("03 123 4567").isValid).toBe(true);
    expect(validateNZ("04 123 4567").isValid).toBe(true);
    expect(validateNZ("09 123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateNZ("021 123 4567").isValid).toBe(true);
    expect(validateNZ("021-123-4567").isValid).toBe(true);
    expect(validateNZ("+64 21 123 4567").isValid).toBe(true);
    expect(validateNZ("0064 21 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateNZ("021 123 456").isValid).toBe(false); // too short
    expect(validateNZ("021 123 45678").isValid).toBe(false); // too long
    expect(validateNZ("123").isValid).toBe(false);
    expect(validateNZ("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid mobile prefixes", () => {
    expect(validateNZ("025 123 4567").isValid).toBe(false);
    expect(validateNZ("026 123 4567").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateNZ("021 123 456a").isValid).toBe(false);
    expect(validateNZ("abc def ghi").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateNZ("21 123 4567").isValid).toBe(false);
  });
});

