import { describe, test, expect } from "vitest";
import { validateIE } from "../src/validators/ie";

describe("validateIE - Irish phone numbers", () => {
  test("should accept valid Irish mobile numbers", () => {
    expect(validateIE("087 123 4567").isValid).toBe(true);
    expect(validateIE("085 123 4567").isValid).toBe(true);
    expect(validateIE("083 123 4567").isValid).toBe(true);
  });

  test("should accept Irish landline numbers", () => {
    expect(validateIE("01 123 4567").isValid).toBe(true); // Dublin
    expect(validateIE("021 123 4567").isValid).toBe(true); // Cork
    expect(validateIE("091 123 456").isValid).toBe(true); // Galway
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIE("087 123 4567").isValid).toBe(true);
    expect(validateIE("087-123-4567").isValid).toBe(true);
    expect(validateIE("01 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+353)", () => {
    expect(validateIE("+353 87 123 4567").isValid).toBe(true);
    expect(validateIE("+353 1 123 4567").isValid).toBe(true);
    expect(validateIE("353 87 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIE("087 123 456").isValid).toBe(false);
    expect(validateIE("087 123 45678").isValid).toBe(false);
    expect(validateIE("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateIE("097 123 4567").isValid).toBe(false);
    expect(validateIE("081 123 4567").isValid).toBe(false);
  });
});





