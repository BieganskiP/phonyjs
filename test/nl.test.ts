import { describe, test, expect } from "vitest";
import { validateNL } from "../src/validators/nl";

describe("validateNL - Dutch phone numbers", () => {
  test("should accept valid Dutch mobile numbers", () => {
    expect(validateNL("0612345678")).toBe(true);
    expect(validateNL("0687654321")).toBe(true);
    expect(validateNL("0698765432")).toBe(true);
    expect(validateNL("0656789012")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateNL("06 1234 5678")).toBe(true);
    expect(validateNL("06-1234-5678")).toBe(true);
    expect(validateNL("06 12 34 56 78")).toBe(true);
  });

  test("should accept international format (+31)", () => {
    expect(validateNL("+31 6 1234 5678")).toBe(true);
    expect(validateNL("+31612345678")).toBe(true);
    expect(validateNL("31 6 1234 5678")).toBe(true);
  });

  test("should accept Dutch landline numbers", () => {
    expect(validateNL("0201234567")).toBe(true); // landline (Amsterdam)
    expect(validateNL("0101234567")).toBe(true); // landline (Rotterdam)
    expect(validateNL("0301234567")).toBe(true); // landline (Utrecht)
  });

  test("should reject invalid Dutch numbers", () => {
    expect(validateNL("6123456789")).toBe(false); // missing leading 0
    expect(validateNL("0701234567")).toBe(false); // invalid prefix
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateNL("061234567")).toBe(false); // too short
    expect(validateNL("06123456789")).toBe(false); // too long
    expect(validateNL("06")).toBe(false);
    expect(validateNL("")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateNL("061234567a")).toBe(false);
    expect(validateNL("a612345678")).toBe(false);
  });
});

