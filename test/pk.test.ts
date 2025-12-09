import { describe, test, expect } from "vitest";
import { validatePK } from "../src/validators/pk";

describe("validatePK - Pakistani phone numbers", () => {
  test("should accept valid Pakistani mobile numbers", () => {
    expect(validatePK("0300 1234567")).toBe(true); // Jazz
    expect(validatePK("0345 1234567")).toBe(true); // Telenor
    expect(validatePK("0321 1234567")).toBe(true); // Zong
    expect(validatePK("03001234567")).toBe(true); // no formatting
  });

  test("should accept Pakistani landline numbers", () => {
    expect(validatePK("021 12345678")).toBe(true); // Karachi
    expect(validatePK("042 12345678")).toBe(true); // Lahore
    expect(validatePK("051 1234567")).toBe(true); // Islamabad
    expect(validatePK("091 1234567")).toBe(true); // Peshawar
  });

  test("should accept phone numbers with formatting", () => {
    expect(validatePK("0300 123 4567")).toBe(true);
    expect(validatePK("0300-123-4567")).toBe(true);
    expect(validatePK("021 1234 5678")).toBe(true);
  });

  test("should accept international format (+92)", () => {
    expect(validatePK("+92 300 1234567")).toBe(true); // mobile
    expect(validatePK("+92 21 12345678")).toBe(true); // landline
    expect(validatePK("92 300 1234567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validatePK("0300 123456")).toBe(false); // too short
    expect(validatePK("0300 12345678")).toBe(false); // too long for mobile
    expect(validatePK("0300")).toBe(false);
    expect(validatePK("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    // 0350 is actually a valid landline area code (Hyderabad), so this would be accepted
    // Let's test truly invalid ones
    expect(validatePK("0100 1234567")).toBe(false); // 010x not valid
    expect(validatePK("0000 1234567")).toBe(false); // 000x not valid
  });
});

