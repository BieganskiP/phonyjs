import { describe, test, expect } from "vitest";
import { validateCV } from "../../src/validators/africa/cv";

describe("validateCV - Cape Verde phone numbers", () => {
  test("should accept valid Cape Verde mobile numbers", () => {
    expect(validateCV("991 23 45").isValid).toBe(true);
    expect(validateCV("591 23 45").isValid).toBe(true);
  });

  test("should accept Cape Verde landline numbers", () => {
    expect(validateCV("221 23 45").isValid).toBe(true);
  });

  test("should accept international format (+238)", () => {
    expect(validateCV("+238 991 23 45").isValid).toBe(true);
  });

  test("should reject incorrect length", () => {
    expect(validateCV("991 23 4").isValid).toBe(false);
    expect(validateCV("").isValid).toBe(false);
  });
});

