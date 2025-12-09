import { describe, test, expect } from "vitest";
import { validateAT } from "../src/validators/at";

describe("validateAT - Austrian phone numbers", () => {
  test("should accept valid Austrian mobile numbers", () => {
    expect(validateAT("0650 123 4567")).toBe(true);
    expect(validateAT("0664 123 4567")).toBe(true);
    expect(validateAT("0699 123 4567")).toBe(true);
  });

  test("should accept Austrian landline numbers", () => {
    expect(validateAT("01 123 4567")).toBe(true); // Vienna
    expect(validateAT("0316 123 456")).toBe(true); // Graz
    expect(validateAT("0512 123 456")).toBe(true); // Innsbruck
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAT("0650 123 4567")).toBe(true);
    expect(validateAT("0650-123-4567")).toBe(true);
    expect(validateAT("01 123 4567")).toBe(true);
  });

  test("should accept international format (+43)", () => {
    expect(validateAT("+43 650 123 4567")).toBe(true);
    expect(validateAT("+43 1 123 4567")).toBe(true);
    expect(validateAT("43 650 123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAT("0650 123 45")).toBe(false);
    expect(validateAT("0650 123 456789012345")).toBe(false);
    expect(validateAT("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    // 06xx are mobile-only prefixes when followed by specific patterns
    // For this test, just ensure clearly invalid patterns fail
    expect(validateAT("00 123 4567")).toBe(false);
  });
});

