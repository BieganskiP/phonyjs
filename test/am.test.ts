import { describe, test, expect } from "vitest";
import { validateAM } from "../src/validators/am";

describe("validateAM - Armenian phone numbers", () => {
  test("should accept valid Armenian mobile numbers", () => {
    expect(validateAM("077 123 456")).toBe(true);
    expect(validateAM("091 123 456")).toBe(true);
    expect(validateAM("099 123 456")).toBe(true);
  });

  test("should accept Armenian landline numbers", () => {
    expect(validateAM("10 123 456")).toBe(true); // Yerevan
    expect(validateAM("231 123 45")).toBe(true); // Gyumri
    expect(validateAM("281 123 45")).toBe(true); // Vanadzor
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAM("077 123 456")).toBe(true);
    expect(validateAM("077-123-456")).toBe(true);
    expect(validateAM("10 123 456")).toBe(true);
  });

  test("should accept international format (+374)", () => {
    expect(validateAM("+374 77 123 456")).toBe(true);
    expect(validateAM("+374 10 123 456")).toBe(true);
    expect(validateAM("374 77 123 456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAM("077 123 45")).toBe(false);
    expect(validateAM("077 123 45678")).toBe(false);
    expect(validateAM("")).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateAM("070 123 456")).toBe(false);
    expect(validateAM("092 123 456")).toBe(false);
  });
});

