import { describe, test, expect } from "vitest";
import { validateGB } from "../src/validators/gb";

describe("validateGB - UK mobile phone numbers", () => {
  test("should accept valid UK mobile numbers", () => {
    expect(validateGB("07123456789")).toBe(true);
    expect(validateGB("07912345678")).toBe(true);
    expect(validateGB("07812345678")).toBe(true);
    expect(validateGB("07512345678")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGB("07123 456789")).toBe(true);
    expect(validateGB("07123-456789")).toBe(true);
    expect(validateGB("071 2345 6789")).toBe(true);
    expect(validateGB("+44 7123 456789")).toBe(true);
  });

  test("should accept UK landline numbers", () => {
    expect(validateGB("01123456789")).toBe(true); // Manchester
    expect(validateGB("02012345678")).toBe(true); // London
    expect(validateGB("03001234567")).toBe(true); // Non-geographic
  });

  test("should reject invalid UK numbers", () => {
    expect(validateGB("08123456789")).toBe(false); // Invalid prefix
    expect(validateGB("06123456789")).toBe(false); // Invalid prefix
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateGB("0712345678")).toBe(false); // too short
    expect(validateGB("071234567890")).toBe(false); // too long
    expect(validateGB("071")).toBe(false);
    expect(validateGB("")).toBe(false);
  });

  test("should reject phone numbers with only non-digit characters", () => {
    expect(validateGB("abc defg hijk")).toBe(false);
    expect(validateGB("-----------")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateGB("0712345678a")).toBe(false);
    expect(validateGB("a7123456789")).toBe(false);
  });

  test("should reject 070 numbers (personal numbers, not mobile)", () => {
    expect(validateGB("07012345678")).toBe(false);
    expect(validateGB("070 1234 5678")).toBe(false);
    expect(validateGB("+44 7012 345678")).toBe(false);
  });
});
