import { describe, test, expect } from "vitest";
import { validateSG } from "../src/validators/sg";

describe("validateSG - Singapore phone numbers", () => {
  test("should accept valid Singapore mobile numbers", () => {
    expect(validateSG("81234567")).toBe(true);
    expect(validateSG("91234567")).toBe(true);
    expect(validateSG("98765432")).toBe(true);
  });

  test("should accept Singapore landline numbers", () => {
    expect(validateSG("61234567")).toBe(true);
    expect(validateSG("65551234")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSG("8123 4567")).toBe(true);
    expect(validateSG("8123-4567")).toBe(true);
    expect(validateSG("6123 4567")).toBe(true);
  });

  test("should accept international format (+65)", () => {
    expect(validateSG("+65 8123 4567")).toBe(true); // mobile
    expect(validateSG("+65 6123 4567")).toBe(true); // landline
    expect(validateSG("65 9123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSG("8123456")).toBe(false); // too short
    expect(validateSG("812345678")).toBe(false); // too long
    expect(validateSG("81")).toBe(false);
    expect(validateSG("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateSG("51234567")).toBe(false); // starts with 5
    expect(validateSG("71234567")).toBe(false); // starts with 7
  });
});

