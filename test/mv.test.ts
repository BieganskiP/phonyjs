import { describe, test, expect } from "vitest";
import { validateMV } from "../src/validators/mv";

describe("validateMV - Maldivian phone numbers", () => {
  test("should accept valid Maldivian mobile numbers", () => {
    expect(validateMV("791 2345").isValid).toBe(true);
    expect(validateMV("792 2345").isValid).toBe(true);
    expect(validateMV("960 2345").isValid).toBe(true);
  });

  test("should accept Maldivian landline numbers", () => {
    expect(validateMV("332 1234").isValid).toBe(true);
    expect(validateMV("334 1234").isValid).toBe(true);
    expect(validateMV("664 1234").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateMV("791 2345").isValid).toBe(true);
    expect(validateMV("791-2345").isValid).toBe(true);
    expect(validateMV("332 1234").isValid).toBe(true);
  });

  test("should accept international format (+960)", () => {
    expect(validateMV("+960 791 2345").isValid).toBe(true);
    expect(validateMV("+960 332 1234").isValid).toBe(true);
    expect(validateMV("960 791 2345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateMV("791 234").isValid).toBe(false);
    expect(validateMV("791 23456").isValid).toBe(false);
    expect(validateMV("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateMV("191 2345").isValid).toBe(false);
    expect(validateMV("891 2345").isValid).toBe(false);
  });
});





