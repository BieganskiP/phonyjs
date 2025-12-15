import { describe, test, expect } from "vitest";
import { validateAL } from "../src/validators/al";

describe("validateAL - Albanian phone numbers", () => {
  test("should accept valid Albanian mobile numbers", () => {
    expect(validateAL("069 123 4567").isValid).toBe(true);
    expect(validateAL("068 123 4567").isValid).toBe(true);
    expect(validateAL("067 123 4567").isValid).toBe(true);
  });

  test("should accept Albanian landline numbers", () => {
    expect(validateAL("04 234 5678").isValid).toBe(true); // Tirana
    expect(validateAL("052 123 456").isValid).toBe(true); // Durrës
    expect(validateAL("082 123 456").isValid).toBe(true); // Vlorë
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAL("069 123 4567").isValid).toBe(true);
    expect(validateAL("069-123-4567").isValid).toBe(true);
    expect(validateAL("04 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+355)", () => {
    expect(validateAL("+355 69 123 4567").isValid).toBe(true);
    expect(validateAL("+355 4 234 5678").isValid).toBe(true);
    expect(validateAL("355 69 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAL("069 123 45").isValid).toBe(false);
    expect(validateAL("069 123 456789").isValid).toBe(false);
    expect(validateAL("").isValid).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateAL("065 123 4567").isValid).toBe(false);
    expect(validateAL("060 123 4567").isValid).toBe(false);
    expect(validateAL("066 123 4567").isValid).toBe(false); // 066 not valid
  });
});
