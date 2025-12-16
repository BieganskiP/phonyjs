import { describe, test, expect } from "vitest";
import { validateID } from "../../src/validators/asia/id";

describe("validateID - Indonesian phone numbers", () => {
  test("should accept valid Indonesian mobile numbers", () => {
    expect(validateID("081234567890").isValid).toBe(true); // Telkomsel
    expect(validateID("085612345678").isValid).toBe(true); // Indosat
    expect(validateID("081912345678").isValid).toBe(true); // XL Axiata
    expect(validateID("089812345678").isValid).toBe(true); // Tri
  });

  test("should accept Indonesian landline numbers", () => {
    expect(validateID("02112345678").isValid).toBe(true); // Jakarta
    expect(validateID("02212345678").isValid).toBe(true); // Bandung
    expect(validateID("03112345678").isValid).toBe(true); // Surabaya
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateID("0812 3456 7890").isValid).toBe(true);
    expect(validateID("0812-3456-7890").isValid).toBe(true);
    expect(validateID("021 1234 5678").isValid).toBe(true);
  });

  test("should accept international format (+62)", () => {
    expect(validateID("+62 812 3456 7890").isValid).toBe(true); // mobile
    expect(validateID("+62 21 1234 5678").isValid).toBe(true); // landline Jakarta
    expect(validateID("62 812 3456 7890").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateID("0812345").isValid).toBe(false); // too short
    expect(validateID("08123456789012345").isValid).toBe(false); // too long
    expect(validateID("081").isValid).toBe(false);
    expect(validateID("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateID("0012345678").isValid).toBe(false);
    expect(validateID("8812345678").isValid).toBe(false); // missing leading 0
  });
});





