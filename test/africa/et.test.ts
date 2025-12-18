import { describe, test, expect } from "vitest";
import { validateET } from "../../src/validators/africa/et";

describe("validateET - Ethiopia phone numbers", () => {
  test("should accept valid Ethiopia phone numbers", () => {
    expect(validateET("91 123 4567").isValid).toBe(true);
    expect(validateET("11 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+251)", () => {
    expect(validateET("+251 91 123 4567").isValid).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateET("81 123 4567").isValid).toBe(false);
    expect(validateET("").isValid).toBe(false);
  });
});

