import { describe, test, expect } from "vitest";
import { validateLA } from "../../src/validators/asia-pacific/la";

describe("validateLA - Laotian phone numbers", () => {
  test("should accept valid Laotian mobile numbers", () => {
    expect(validateLA("020 123 4567").isValid).toBe(true);
    expect(validateLA("020 987 6543").isValid).toBe(true);
  });

  test("should accept valid Laotian landline numbers", () => {
    expect(validateLA("021 123 4567").isValid).toBe(true);
    expect(validateLA("023 123 456").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateLA("020 123 4567").isValid).toBe(true);
    expect(validateLA("020-123-4567").isValid).toBe(true);
    expect(validateLA("+856 20 123 4567").isValid).toBe(true);
    expect(validateLA("00856 20 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLA("020 123 456").isValid).toBe(false); // too short
    expect(validateLA("020 123 45678").isValid).toBe(false); // too long
    expect(validateLA("123").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateLA("020 123 456a").isValid).toBe(false);
    expect(validateLA("abc def ghi").isValid).toBe(false);
  });
});

