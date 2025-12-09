import { describe, test, expect } from "vitest";
import { validateUG } from "../src/validators/ug";

describe("validateUG - Ugandan phone numbers", () => {
  test("should accept valid Ugandan mobile numbers", () => {
    expect(validateUG("0712 345 678")).toBe(true);
    expect(validateUG("0772 345 678")).toBe(true);
    expect(validateUG("0701 234 567")).toBe(true);
  });

  test("should accept Ugandan landline numbers", () => {
    expect(validateUG("041 234 5678")).toBe(true); // Kampala
    expect(validateUG("0392 123 456")).toBe(true); // Entebbe
    expect(validateUG("031 234 5678")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateUG("0712 345 678")).toBe(true);
    expect(validateUG("0712-345-678")).toBe(true);
    expect(validateUG("041 234 5678")).toBe(true);
  });

  test("should accept international format (+256)", () => {
    expect(validateUG("+256 712 345 678")).toBe(true);
    expect(validateUG("+256 41 234 5678")).toBe(true);
    expect(validateUG("256 712 345 678")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateUG("0712 345 67")).toBe(false);
    expect(validateUG("0712 345 6789")).toBe(false);
    expect(validateUG("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateUG("0812 345 678")).toBe(false);
    expect(validateUG("0512 345 678")).toBe(false);
  });
});

