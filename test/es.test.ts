import { describe, test, expect } from "vitest";
import { validateES } from "../src/validators/es";

describe("validateES - Spanish phone numbers", () => {
  test("should accept valid Spanish mobile numbers", () => {
    expect(validateES("612345678")).toBe(true); // starts with 6
    expect(validateES("712345678")).toBe(true); // starts with 7
    expect(validateES("698765432")).toBe(true);
    expect(validateES("787654321")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateES("612 345 678")).toBe(true);
    expect(validateES("612-345-678")).toBe(true);
    expect(validateES("612 34 56 78")).toBe(true);
  });

  test("should accept international format (+34)", () => {
    expect(validateES("+34 612 345 678")).toBe(true);
    expect(validateES("+34612345678")).toBe(true);
    expect(validateES("34 712 345 678")).toBe(true);
  });

  test("should accept Spanish landline numbers", () => {
    expect(validateES("812345678")).toBe(true); // landline
    expect(validateES("912345678")).toBe(true); // landline - Madrid
    expect(validateES("934123456")).toBe(true); // landline - Barcelona
  });

  test("should reject invalid Spanish numbers", () => {
    expect(validateES("512345678")).toBe(false); // invalid prefix
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateES("61234567")).toBe(false); // too short
    expect(validateES("6123456789")).toBe(false); // too long
    expect(validateES("612")).toBe(false);
    expect(validateES("")).toBe(false);
  });

  test("should reject phone numbers with letters mixed in", () => {
    expect(validateES("61234567a")).toBe(false);
    expect(validateES("a12345678")).toBe(false);
  });
});

