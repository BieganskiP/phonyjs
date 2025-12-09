import { describe, test, expect } from "vitest";
import { validateGR } from "../src/validators/gr";

describe("validateGR - Greek phone numbers", () => {
  test("should accept valid Greek mobile numbers", () => {
    expect(validateGR("690 123 4567")).toBe(true); // Cosmote
    expect(validateGR("691 123 4567")).toBe(true); // Vodafone
    expect(validateGR("697 123 4567")).toBe(true); // Wind
    expect(validateGR("6901234567")).toBe(true); // no formatting
  });

  test("should accept Greek landline numbers", () => {
    expect(validateGR("21 1234 5678")).toBe(true); // Athens
    expect(validateGR("231 123 4567")).toBe(true); // Thessaloniki
    expect(validateGR("261 123 4567")).toBe(true); // Patras
    expect(validateGR("281 123 4567")).toBe(true); // Heraklion
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGR("690 123 4567")).toBe(true);
    expect(validateGR("690-123-4567")).toBe(true);
    expect(validateGR("21 1234 5678")).toBe(true);
  });

  test("should accept international format (+30)", () => {
    expect(validateGR("+30 690 123 4567")).toBe(true); // mobile
    expect(validateGR("+30 21 1234 5678")).toBe(true); // landline
    expect(validateGR("30 690 123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateGR("690 123 456")).toBe(false); // too short
    expect(validateGR("690 123 45678")).toBe(false); // too long
    expect(validateGR("690")).toBe(false);
    expect(validateGR("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateGR("790 123 4567")).toBe(false); // mobile must start 69x
    expect(validateGR("31 1234 5678")).toBe(false); // landline must start 2x
  });
});

