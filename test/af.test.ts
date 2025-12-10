import { describe, test, expect } from "vitest";
import { validateAF } from "../src/validators/af";

describe("validateAF - Afghanistan phone numbers", () => {
  test("should accept valid Afghanistan mobile numbers", () => {
    expect(validateAF("70 123 4567").isValid).toBe(true);
    expect(validateAF("75 123 4567").isValid).toBe(true);
    expect(validateAF("79 123 4567").isValid).toBe(true);
  });

  test("should accept Afghanistan landline numbers", () => {
    expect(validateAF("20 123 4567").isValid).toBe(true); // Kabul
    expect(validateAF("40 123 4567").isValid).toBe(true); // Herat
    expect(validateAF("30 123 4567").isValid).toBe(true); // Kandahar
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAF("70 123 4567").isValid).toBe(true);
    expect(validateAF("70-123-4567").isValid).toBe(true);
    expect(validateAF("20 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+93)", () => {
    expect(validateAF("+93 70 123 4567").isValid).toBe(true);
    expect(validateAF("+93 20 123 4567").isValid).toBe(true);
    expect(validateAF("93 70 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAF("70 123 456").isValid).toBe(false);
    expect(validateAF("70 123 45678").isValid).toBe(false);
    expect(validateAF("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateAF("10 123 4567").isValid).toBe(false);
    expect(validateAF("80 123 4567").isValid).toBe(false);
  });
});





