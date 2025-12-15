import { describe, test, expect } from "vitest";
import { validateFR } from "../../src/validators/europe/fr";

describe("validateFR - French phone numbers", () => {
  test("should accept valid French mobile numbers", () => {
    expect(validateFR("0612345678").isValid).toBe(true);
    expect(validateFR("0712345678").isValid).toBe(true);
    expect(validateFR("0698765432").isValid).toBe(true);
    expect(validateFR("0787654321").isValid).toBe(true);
  });

  test("should accept French landline numbers", () => {
    expect(validateFR("0123456789").isValid).toBe(true); // Paris
    expect(validateFR("0223456789").isValid).toBe(true); // Northwest
    expect(validateFR("0323456789").isValid).toBe(true); // Northeast
    expect(validateFR("0423456789").isValid).toBe(true); // Southeast
    expect(validateFR("0523456789").isValid).toBe(true); // Southwest
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateFR("06 12 34 56 78").isValid).toBe(true);
    expect(validateFR("06-12-34-56-78").isValid).toBe(true);
    expect(validateFR("06.12.34.56.78").isValid).toBe(true);
  });

  test("should accept international format (+33)", () => {
    expect(validateFR("+33 6 12 34 56 78").isValid).toBe(true);
    expect(validateFR("+33612345678").isValid).toBe(true);
    expect(validateFR("33 7 12 34 56 78").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateFR("061234567").isValid).toBe(false); // too short
    expect(validateFR("06123456789").isValid).toBe(false); // too long
    expect(validateFR("06").isValid).toBe(false);
    expect(validateFR("").isValid).toBe(false);
  });

  test("should reject phone numbers not starting with 0", () => {
    expect(validateFR("6123456789").isValid).toBe(false);
    expect(validateFR("1234567890").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateFR("061234567a").isValid).toBe(false);
    expect(validateFR("a612345678").isValid).toBe(false);
  });
});





