import { describe, test, expect } from "vitest";
import { validateKE } from "../src/validators/ke";

describe("validateKE - Kenyan phone numbers", () => {
  test("should accept valid Kenyan mobile numbers", () => {
    expect(validateKE("0712 345 678")).toBe(true);
    expect(validateKE("0722 345 678")).toBe(true);
    expect(validateKE("0110 345 678")).toBe(true);
  });

  test("should accept Kenyan landline numbers", () => {
    expect(validateKE("020 123 4567")).toBe(true); // Nairobi
    expect(validateKE("041 234 5678")).toBe(true); // Mombasa
    expect(validateKE("051 234 5678")).toBe(true); // Nakuru
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateKE("0712 345 678")).toBe(true);
    expect(validateKE("0712-345-678")).toBe(true);
    expect(validateKE("020 123 4567")).toBe(true);
  });

  test("should accept international format (+254)", () => {
    expect(validateKE("+254 712 345 678")).toBe(true);
    expect(validateKE("+254 20 123 4567")).toBe(true);
    expect(validateKE("254 712 345 678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateKE("0712 345 67")).toBe(false);
    expect(validateKE("0712 345 6789")).toBe(false);
    expect(validateKE("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateKE("0812 345 678")).toBe(false);
    expect(validateKE("0912 345 678")).toBe(false);
  });
});

