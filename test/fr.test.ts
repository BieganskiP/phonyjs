import { describe, test, expect } from "vitest";
import { validateFR } from "../src/validators/fr";

describe("validateFR - French phone numbers", () => {
  test("should accept valid French mobile numbers", () => {
    expect(validateFR("0612345678")).toBe(true);
    expect(validateFR("0712345678")).toBe(true);
    expect(validateFR("0698765432")).toBe(true);
    expect(validateFR("0787654321")).toBe(true);
  });

  test("should accept French landline numbers", () => {
    expect(validateFR("0123456789")).toBe(true); // Paris
    expect(validateFR("0223456789")).toBe(true); // Northwest
    expect(validateFR("0323456789")).toBe(true); // Northeast
    expect(validateFR("0423456789")).toBe(true); // Southeast
    expect(validateFR("0523456789")).toBe(true); // Southwest
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateFR("06 12 34 56 78")).toBe(true);
    expect(validateFR("06-12-34-56-78")).toBe(true);
    expect(validateFR("06.12.34.56.78")).toBe(true);
  });

  test("should accept international format (+33)", () => {
    expect(validateFR("+33 6 12 34 56 78")).toBe(true);
    expect(validateFR("+33612345678")).toBe(true);
    expect(validateFR("33 7 12 34 56 78")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateFR("061234567")).toBe(false); // too short
    expect(validateFR("06123456789")).toBe(false); // too long
    expect(validateFR("06")).toBe(false);
    expect(validateFR("")).toBe(false);
  });

  test("should reject phone numbers not starting with 0", () => {
    expect(validateFR("6123456789")).toBe(false);
    expect(validateFR("1234567890")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateFR("061234567a")).toBe(false);
    expect(validateFR("a612345678")).toBe(false);
  });
});

