import { describe, test, expect } from "vitest";
import { validateCI } from "../../src/validators/africa/ci";

describe("validateCI - Ivory Coast phone numbers", () => {
  test("should accept valid Ivory Coast mobile numbers", () => {
    expect(validateCI("01 23 45 67 89").isValid).toBe(true);
    expect(validateCI("05 23 45 67 89").isValid).toBe(true);
    expect(validateCI("07 23 45 67 89").isValid).toBe(true);
  });

  test("should accept Ivory Coast landline numbers", () => {
    expect(validateCI("27 12 34 56 78").isValid).toBe(true);
  });

  test("should accept international format (+225)", () => {
    expect(validateCI("+225 01 23 45 67 89").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateCI("01 23 45 67 8").isValid).toBe(false);
    expect(validateCI("").isValid).toBe(false);
  });
});

