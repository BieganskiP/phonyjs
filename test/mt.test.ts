import { describe, test, expect } from "vitest";
import { validateMT } from "../src/validators/mt";

describe("validateMT - Maltese phone numbers", () => {
  test("should accept valid Maltese landline numbers", () => {
    expect(validateMT("21 234 567").isValid).toBe(true);
    expect(validateMT("21234567").isValid).toBe(true);
  });

  test("should accept valid Maltese mobile numbers", () => {
    expect(validateMT("9923 4567").isValid).toBe(true);
    expect(validateMT("71234567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMT("21 234 567").isValid).toBe(true);
    expect(validateMT("21-234-567").isValid).toBe(true);
    expect(validateMT("+356 21 234 567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMT("1234567").isValid).toBe(false); // too short
    expect(validateMT("123456789").isValid).toBe(false); // too long
    expect(validateMT("123").isValid).toBe(false);
    expect(validateMT("").isValid).toBe(false);
  });

  test("should reject numbers not starting with 2, 7, or 9", () => {
    expect(validateMT("01234567").isValid).toBe(false);
    expect(validateMT("11234567").isValid).toBe(false);
  });
});

