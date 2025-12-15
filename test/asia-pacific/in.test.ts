import { describe, test, expect } from "vitest";
import { validateIN } from "../../src/validators/asia-pacific/in";

describe("validateIN - Indian phone numbers", () => {
  test("should accept valid Indian mobile numbers", () => {
    expect(validateIN("9876543210").isValid).toBe(true);
    expect(validateIN("8123456789").isValid).toBe(true);
    expect(validateIN("7012345678").isValid).toBe(true);
    expect(validateIN("6543210987").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIN("98765 43210").isValid).toBe(true);
    expect(validateIN("987-654-3210").isValid).toBe(true);
    expect(validateIN("98765-43210").isValid).toBe(true);
  });

  test("should accept international format (+91)", () => {
    expect(validateIN("+91 98765 43210").isValid).toBe(true);
    expect(validateIN("+919876543210").isValid).toBe(true);
    expect(validateIN("91 9876543210").isValid).toBe(true);
  });

  test("should accept Indian landline numbers", () => {
    expect(validateIN("1123456789").isValid).toBe(true); // landline (Delhi - area code 11)
    expect(validateIN("2212345678").isValid).toBe(true); // landline (Mumbai - area code 22)
    expect(validateIN("3312345678").isValid).toBe(true); // landline (Kolkata - area code 33)
  });

  test("should reject phone numbers with incorrect format", () => {
    expect(validateIN("0123456789").isValid).toBe(false); // starts with 0
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIN("987654321").isValid).toBe(false); // too short
    expect(validateIN("98765432100").isValid).toBe(false); // too long
    expect(validateIN("987").isValid).toBe(false);
    expect(validateIN("").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateIN("987654321a").isValid).toBe(false);
    expect(validateIN("a876543210").isValid).toBe(false);
  });
});





