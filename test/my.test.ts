import { describe, test, expect } from "vitest";
import { validateMY } from "../src/validators/my";

describe("validateMY - Malaysian phone numbers", () => {
  test("should accept valid Malaysian mobile numbers", () => {
    expect(validateMY("012 345 6789")).toBe(true);
    expect(validateMY("013 345 6789")).toBe(true);
    expect(validateMY("019 345 6789")).toBe(true);
  });

  test("should accept Malaysian landline numbers", () => {
    expect(validateMY("03 1234 5678")).toBe(true); // Kuala Lumpur
    expect(validateMY("04 123 4567")).toBe(true); // Penang
    expect(validateMY("07 123 4567")).toBe(true); // Johor
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMY("012 345 6789")).toBe(true);
    expect(validateMY("012-345-6789")).toBe(true);
    expect(validateMY("03 1234 5678")).toBe(true);
  });

  test("should accept international format (+60)", () => {
    expect(validateMY("+60 12 345 6789")).toBe(true);
    expect(validateMY("+60 3 1234 5678")).toBe(true);
    expect(validateMY("60 12 345 6789")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMY("012 345 678")).toBe(false);
    expect(validateMY("012 345 678901")).toBe(false);
    expect(validateMY("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateMY("002 345 6789")).toBe(false);
    expect(validateMY("112 345 6789")).toBe(false);
  });
});

