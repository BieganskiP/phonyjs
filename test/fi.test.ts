import { describe, test, expect } from "vitest";
import { validateFI } from "../src/validators/fi";

describe("validateFI - Finnish phone numbers", () => {
  test("should accept valid Finnish mobile numbers", () => {
    expect(validateFI("040 123 4567")).toBe(true);
    expect(validateFI("044 123 4567")).toBe(true);
    expect(validateFI("050 123 4567")).toBe(true);
  });

  test("should accept Finnish landline numbers", () => {
    expect(validateFI("09 1234 567")).toBe(true); // Helsinki
    expect(validateFI("03 1234 567")).toBe(true); // Tampere
    expect(validateFI("02 1234 567")).toBe(true); // Turku
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateFI("040 123 4567")).toBe(true);
    expect(validateFI("040-123-4567")).toBe(true);
    expect(validateFI("09 1234 567")).toBe(true);
  });

  test("should accept international format (+358)", () => {
    expect(validateFI("+358 40 123 4567")).toBe(true);
    expect(validateFI("+358 9 1234 567")).toBe(true);
    expect(validateFI("358 40 123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateFI("040 123 45")).toBe(false);
    expect(validateFI("040 123 456789012")).toBe(false);
    expect(validateFI("")).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateFI("060 123 4567")).toBe(false);
  });
});

