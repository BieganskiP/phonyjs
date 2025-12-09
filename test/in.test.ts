import { describe, test, expect } from "vitest";
import { validateIN } from "../src/validators/in";

describe("validateIN - Indian phone numbers", () => {
  test("should accept valid Indian mobile numbers", () => {
    expect(validateIN("9876543210")).toBe(true);
    expect(validateIN("8123456789")).toBe(true);
    expect(validateIN("7012345678")).toBe(true);
    expect(validateIN("6543210987")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateIN("98765 43210")).toBe(true);
    expect(validateIN("987-654-3210")).toBe(true);
    expect(validateIN("98765-43210")).toBe(true);
  });

  test("should accept international format (+91)", () => {
    expect(validateIN("+91 98765 43210")).toBe(true);
    expect(validateIN("+919876543210")).toBe(true);
    expect(validateIN("91 9876543210")).toBe(true);
  });

  test("should reject phone numbers with incorrect prefix", () => {
    expect(validateIN("5123456789")).toBe(false); // starts with 5
    expect(validateIN("4123456789")).toBe(false); // starts with 4
    expect(validateIN("3123456789")).toBe(false); // starts with 3
    expect(validateIN("2123456789")).toBe(false); // starts with 2
    expect(validateIN("1123456789")).toBe(false); // starts with 1
    expect(validateIN("0123456789")).toBe(false); // starts with 0
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateIN("987654321")).toBe(false); // too short
    expect(validateIN("98765432100")).toBe(false); // too long
    expect(validateIN("987")).toBe(false);
    expect(validateIN("")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateIN("987654321a")).toBe(false);
    expect(validateIN("a876543210")).toBe(false);
  });
});

