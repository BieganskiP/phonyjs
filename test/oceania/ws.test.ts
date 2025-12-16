import { describe, test, expect } from "vitest";
import { validateWS } from "../../src/validators/oceania/ws";

describe("validateWS - Samoan phone numbers", () => {
  test("should accept valid Samoan phone numbers", () => {
    expect(validateWS("12345").isValid).toBe(true);
    expect(validateWS("123456").isValid).toBe(true);
    expect(validateWS("123 4567").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateWS("123-45").isValid).toBe(true);
    expect(validateWS("+685 12345").isValid).toBe(true);
    expect(validateWS("00685 12345").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateWS("1234").isValid).toBe(false); // too short
    expect(validateWS("12345678").isValid).toBe(false); // too long
    expect(validateWS("123").isValid).toBe(false);
    expect(validateWS("").isValid).toBe(false);
  });

  test("should reject phone numbers with invalid characters", () => {
    expect(validateWS("1234a").isValid).toBe(false);
    expect(validateWS("abc de").isValid).toBe(false);
  });
});

