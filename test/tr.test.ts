import { describe, test, expect } from "vitest";
import { validateTR } from "../src/validators/tr";

describe("validateTR - Turkish phone numbers", () => {
  test("should accept valid Turkish mobile numbers", () => {
    expect(validateTR("0532 123 4567").isValid).toBe(true); // Vodafone
    expect(validateTR("0542 123 4567").isValid).toBe(true); // Türk Telekom
    expect(validateTR("0505 123 4567").isValid).toBe(true); // Turkcell
    expect(validateTR("05321234567").isValid).toBe(true); // no formatting
  });

  test("should accept Turkish landline numbers", () => {
    expect(validateTR("0212 123 4567").isValid).toBe(true); // Istanbul European
    expect(validateTR("0216 123 4567").isValid).toBe(true); // Istanbul Asian
    expect(validateTR("0312 123 4567").isValid).toBe(true); // Ankara
    expect(validateTR("0232 123 4567").isValid).toBe(true); // Izmir
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateTR("0532 123 4567").isValid).toBe(true);
    expect(validateTR("0532-123-4567").isValid).toBe(true);
    expect(validateTR("(0532) 123 4567").isValid).toBe(true);
  });

  test("should accept international format (+90)", () => {
    expect(validateTR("+90 532 123 4567").isValid).toBe(true); // mobile
    expect(validateTR("+90 212 123 4567").isValid).toBe(true); // landline
    expect(validateTR("90 532 123 4567").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateTR("0532 123 456").isValid).toBe(false); // too short
    expect(validateTR("0532 123 45678").isValid).toBe(false); // too long
    expect(validateTR("0532").isValid).toBe(false);
    expect(validateTR("").isValid).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateTR("0632 123 4567").isValid).toBe(false); // mobile must start 05xx
    expect(validateTR("0112 123 4567").isValid).toBe(false); // landline must start 02-04xx
  });
});





