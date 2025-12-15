import { describe, test, expect } from "vitest";
import { validateIR } from "../src/validators/ir";

describe("validateIR - Iranian phone numbers", () => {
  test("should accept valid Iranian mobile numbers", () => {
    expect(validateIR("0912 345 6789").isValid).toBe(true);
    expect(validateIR("09123456789").isValid).toBe(true);
    expect(validateIR("0935 123 4567").isValid).toBe(true);
  });

  test("should accept valid Iranian landline numbers", () => {
    expect(validateIR("021 1234 5678").isValid).toBe(true);
    expect(validateIR("031 1234 5678").isValid).toBe(true);
    expect(validateIR("041 1234 56789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateIR("0912 345 6789").isValid).toBe(true);
    expect(validateIR("0912-345-6789").isValid).toBe(true);
    expect(validateIR("+98 912 345 6789").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIR("0912 345 678").isValid).toBe(false); // too short
    expect(validateIR("0912 345 67890").isValid).toBe(false); // too long
    expect(validateIR("123").isValid).toBe(false);
    expect(validateIR("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateIR("9123456789").isValid).toBe(false);
  });
});

