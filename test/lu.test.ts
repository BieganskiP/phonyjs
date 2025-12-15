import { describe, test, expect } from "vitest";
import { validateLU } from "../src/validators/lu";

describe("validateLU - Luxembourg phone numbers", () => {
  test("should accept valid Luxembourg phone numbers", () => {
    expect(validateLU("27 123 456").isValid).toBe(true);
    expect(validateLU("621 123 456").isValid).toBe(true);
    expect(validateLU("123456").isValid).toBe(true);
    expect(validateLU("123456789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateLU("27 123 456").isValid).toBe(true);
    expect(validateLU("27-123-456").isValid).toBe(true);
    expect(validateLU("+352 27 123 456").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLU("12345").isValid).toBe(false); // too short
    expect(validateLU("1234567890").isValid).toBe(false); // too long
    expect(validateLU("123").isValid).toBe(false);
    expect(validateLU("").isValid).toBe(false);
  });
});

