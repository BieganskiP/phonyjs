import { describe, test, expect } from "vitest";
import { validateCH } from "../src/validators/ch";

describe("validateCH - Swiss phone numbers", () => {
  test("should accept valid Swiss mobile numbers", () => {
    expect(validateCH("079 123 45 67")).toBe(true);
    expect(validateCH("076 123 45 67")).toBe(true);
    expect(validateCH("078 123 45 67")).toBe(true);
  });

  test("should accept Swiss landline numbers", () => {
    expect(validateCH("044 123 45 67")).toBe(true); // Zurich
    expect(validateCH("031 123 45 67")).toBe(true); // Bern
    expect(validateCH("061 123 45 67")).toBe(true); // Basel
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCH("079 123 45 67")).toBe(true);
    expect(validateCH("079-123-45-67")).toBe(true);
    expect(validateCH("044 123 45 67")).toBe(true);
  });

  test("should accept international format (+41)", () => {
    expect(validateCH("+41 79 123 45 67")).toBe(true);
    expect(validateCH("+41 44 123 45 67")).toBe(true);
    expect(validateCH("41 79 123 45 67")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCH("079 123 45 6")).toBe(false);
    expect(validateCH("079 123 45 678")).toBe(false);
    expect(validateCH("")).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateCH("073 123 45 67")).toBe(false);
    expect(validateCH("070 123 45 67")).toBe(false);
  });
});

