import { describe, test, expect } from "vitest";
import { validateAO } from "../src/validators/ao";

describe("validateAO - Angolan phone numbers", () => {
  test("should accept valid Angolan mobile numbers", () => {
    expect(validateAO("923 123 456")).toBe(true);
    expect(validateAO("924 123 456")).toBe(true);
    expect(validateAO("912 123 456")).toBe(true);
  });

  test("should accept Angolan landline numbers", () => {
    expect(validateAO("222 123 456")).toBe(true); // Luanda
    expect(validateAO("231 123 456")).toBe(true);
    expect(validateAO("235 123 456")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateAO("923 123 456")).toBe(true);
    expect(validateAO("923-123-456")).toBe(true);
    expect(validateAO("222 123 456")).toBe(true);
  });

  test("should accept international format (+244)", () => {
    expect(validateAO("+244 923 123 456")).toBe(true);
    expect(validateAO("+244 222 123 456")).toBe(true);
    expect(validateAO("244 923 123 456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateAO("923 123 45")).toBe(false);
    expect(validateAO("923 123 4567")).toBe(false);
    expect(validateAO("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateAO("123 123 456")).toBe(false);
    expect(validateAO("823 123 456")).toBe(false);
  });
});

