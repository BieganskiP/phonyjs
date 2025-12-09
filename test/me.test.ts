import { describe, test, expect } from "vitest";
import { validateME } from "../src/validators/me";

describe("validateME - Montenegro phone numbers", () => {
  test("should accept valid Montenegro mobile numbers", () => {
    expect(validateME("067 123 456")).toBe(true);
    expect(validateME("069 123 456")).toBe(true);
    expect(validateME("068 123 456")).toBe(true);
  });

  test("should accept Montenegro landline numbers", () => {
    expect(validateME("20 123 456")).toBe(true); // Podgorica
    expect(validateME("30 123 456")).toBe(true); // Nikšić
    expect(validateME("33 123 456")).toBe(true); // Budva
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateME("067 123 456")).toBe(true);
    expect(validateME("067-123-456")).toBe(true);
    expect(validateME("20 123 456")).toBe(true);
  });

  test("should accept international format (+382)", () => {
    expect(validateME("+382 67 123 456")).toBe(true);
    expect(validateME("+382 20 123 456")).toBe(true);
    expect(validateME("382 67 123 456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateME("067 123 45")).toBe(false);
    expect(validateME("067 123 45678")).toBe(false);
    expect(validateME("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateME("070 123 456")).toBe(false);
    expect(validateME("10 123 456")).toBe(false);
  });
});

