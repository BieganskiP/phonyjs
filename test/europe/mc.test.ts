import { describe, test, expect } from "vitest";
import { validateMC } from "../../src/validators/europe/mc";

describe("validateMC - Monacan phone numbers", () => {
  test("should accept valid 8-digit Monacan phone numbers", () => {
    expect(validateMC("93 15 67 89").isValid).toBe(true);
    expect(validateMC("9912 3456").isValid).toBe(true);
    expect(validateMC("93156789").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateMC("93 15 67 89").isValid).toBe(true);
    expect(validateMC("93-15-67-89").isValid).toBe(true);
    expect(validateMC("+377 93 15 67 89").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMC("9315678").isValid).toBe(false); // too short
    expect(validateMC("931567890").isValid).toBe(false); // too long
    expect(validateMC("123").isValid).toBe(false);
    expect(validateMC("").isValid).toBe(false);
  });

  test("should reject numbers not starting with 9", () => {
    expect(validateMC("83156789").isValid).toBe(false);
    expect(validateMC("03156789").isValid).toBe(false);
  });
});

