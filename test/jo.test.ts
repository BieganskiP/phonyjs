import { describe, test, expect } from "vitest";
import { validateJO } from "../src/validators/jo";

describe("validateJO - Jordanian phone numbers", () => {
  test("should accept valid Jordanian mobile numbers", () => {
    expect(validateJO("7 9123 4567")).toBe(true); // Zain/Orange/Umniah
    expect(validateJO("791234567")).toBe(true); // no formatting
  });

  test("should accept Jordanian landline numbers", () => {
    expect(validateJO("6 123 4567")).toBe(true); // Amman
    expect(validateJO("2 123 4567")).toBe(true); // Irbid
    expect(validateJO("06 123 4567")).toBe(true); // with leading 0
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateJO("7 9123 4567")).toBe(true);
    expect(validateJO("7-9123-4567")).toBe(true);
    expect(validateJO("6 123 4567")).toBe(true);
  });

  test("should accept international format (+962)", () => {
    expect(validateJO("+962 7 9123 4567")).toBe(true); // mobile
    expect(validateJO("+962 6 123 4567")).toBe(true); // landline
    expect(validateJO("962 7 9123 4567")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateJO("7 9123 456")).toBe(false); // too short
    expect(validateJO("7 9123 45678")).toBe(false); // too long
    expect(validateJO("79")).toBe(false);
    expect(validateJO("")).toBe(false);
  });

  test("should reject invalid mobile prefixes", () => {
    expect(validateJO("8 9123 4567")).toBe(false); // mobile must start with 7
    expect(validateJO("9 9123 4567")).toBe(false);
  });
});

