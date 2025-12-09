import { describe, test, expect } from "vitest";
import { validateLB } from "../src/validators/lb";

describe("validateLB - Lebanese phone numbers", () => {
  test("should accept valid Lebanese mobile numbers", () => {
    expect(validateLB("3 123 456")).toBe(true); // Alfa
    expect(validateLB("7 123 4567")).toBe(true); // Touch
    expect(validateLB("8 123 4567")).toBe(true); // Touch
    expect(validateLB("31234567")).toBe(true); // no formatting
  });

  test("should accept Lebanese landline numbers", () => {
    expect(validateLB("1 123 456")).toBe(true); // Beirut
    expect(validateLB("4 123 456")).toBe(true); // South Lebanon
    expect(validateLB("1123456")).toBe(true); // no formatting
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateLB("3 123 456")).toBe(true);
    expect(validateLB("3-123-456")).toBe(true);
    expect(validateLB("1 123 456")).toBe(true);
  });

  test("should accept international format (+961)", () => {
    expect(validateLB("+961 3 123 456")).toBe(true); // mobile
    expect(validateLB("+961 1 123 456")).toBe(true); // landline
    expect(validateLB("961 7 123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateLB("3 123 45")).toBe(false); // too short
    expect(validateLB("3 123 456789")).toBe(false); // too long
    expect(validateLB("31")).toBe(false);
    expect(validateLB("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateLB("2 123 4567")).toBe(false); // 2 is not a valid prefix
  });
});

