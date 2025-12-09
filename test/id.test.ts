import { describe, test, expect } from "vitest";
import { validateID } from "../src/validators/id";

describe("validateID - Indonesian phone numbers", () => {
  test("should accept valid Indonesian mobile numbers", () => {
    expect(validateID("081234567890")).toBe(true); // Telkomsel
    expect(validateID("085612345678")).toBe(true); // Indosat
    expect(validateID("081912345678")).toBe(true); // XL Axiata
    expect(validateID("089812345678")).toBe(true); // Tri
  });

  test("should accept Indonesian landline numbers", () => {
    expect(validateID("02112345678")).toBe(true); // Jakarta
    expect(validateID("02212345678")).toBe(true); // Bandung
    expect(validateID("03112345678")).toBe(true); // Surabaya
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateID("0812 3456 7890")).toBe(true);
    expect(validateID("0812-3456-7890")).toBe(true);
    expect(validateID("021 1234 5678")).toBe(true);
  });

  test("should accept international format (+62)", () => {
    expect(validateID("+62 812 3456 7890")).toBe(true); // mobile
    expect(validateID("+62 21 1234 5678")).toBe(true); // landline Jakarta
    expect(validateID("62 812 3456 7890")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateID("0812345")).toBe(false); // too short
    expect(validateID("08123456789012345")).toBe(false); // too long
    expect(validateID("081")).toBe(false);
    expect(validateID("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateID("0012345678")).toBe(false);
    expect(validateID("8812345678")).toBe(false); // missing leading 0
  });
});

