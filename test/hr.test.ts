import { describe, test, expect } from "vitest";
import { validateHR } from "../src/validators/hr";

describe("validateHR - Croatian phone numbers", () => {
  test("should accept valid Croatian mobile numbers", () => {
    expect(validateHR("091 123 4567")).toBe(true);
    expect(validateHR("098 123 4567")).toBe(true);
    expect(validateHR("099 765 4321")).toBe(true);
  });

  test("should accept Croatian landline numbers", () => {
    expect(validateHR("01 234 5678")).toBe(true); // Zagreb
    expect(validateHR("021 345 678")).toBe(true); // Split
    expect(validateHR("051 234 567")).toBe(true); // Rijeka
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateHR("091 123 4567")).toBe(true);
    expect(validateHR("091-123-4567")).toBe(true);
    expect(validateHR("01 234 5678")).toBe(true);
  });

  test("should accept international format (+385)", () => {
    expect(validateHR("+385 91 123 4567")).toBe(true);
    expect(validateHR("+385 1 234 5678")).toBe(true);
    expect(validateHR("385 91 123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateHR("091 123 45")).toBe(false);
    expect(validateHR("091 123 456789")).toBe(false);
    expect(validateHR("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateHR("090 123 4567")).toBe(false);
    expect(validateHR("00 123 4567")).toBe(false);
  });
});

