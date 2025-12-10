import { describe, test, expect } from "vitest";
import { validateES } from "../src/validators/es";

describe("validateES - Spanish phone numbers", () => {
  test("should accept valid Spanish mobile numbers", () => {
    expect(validateES("612345678").isValid).toBe(true); // starts with 6
    expect(validateES("712345678").isValid).toBe(true); // starts with 7
    expect(validateES("698765432").isValid).toBe(true);
    expect(validateES("787654321").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateES("612 345 678").isValid).toBe(true);
    expect(validateES("612-345-678").isValid).toBe(true);
    expect(validateES("612 34 56 78").isValid).toBe(true);
  });

  test("should accept international format (+34)", () => {
    expect(validateES("+34 612 345 678").isValid).toBe(true);
    expect(validateES("+34612345678").isValid).toBe(true);
    expect(validateES("34 712 345 678").isValid).toBe(true);
  });

  test("should accept Spanish landline numbers", () => {
    expect(validateES("812345678").isValid).toBe(true); // landline
    expect(validateES("912345678").isValid).toBe(true); // landline - Madrid
    expect(validateES("934123456").isValid).toBe(true); // landline - Barcelona
  });

  test("should reject invalid Spanish numbers", () => {
    expect(validateES("512345678").isValid).toBe(false); // invalid prefix
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateES("61234567").isValid).toBe(false); // too short
    expect(validateES("6123456789").isValid).toBe(false); // too long
    expect(validateES("612").isValid).toBe(false);
    expect(validateES("").isValid).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateES("61234567a").isValid).toBe(false);
    expect(validateES("a12345678").isValid).toBe(false);
  });
});





