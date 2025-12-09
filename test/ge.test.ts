import { describe, test, expect } from "vitest";
import { validateGE } from "../src/validators/ge";

describe("validateGE - Georgian phone numbers", () => {
  test("should accept valid Georgian mobile numbers", () => {
    expect(validateGE("555 123 456")).toBe(true);
    expect(validateGE("577 123 456")).toBe(true);
    expect(validateGE("599 123 456")).toBe(true);
  });

  test("should accept Georgian landline numbers", () => {
    expect(validateGE("32 234 5678")).toBe(true); // Tbilisi
    expect(validateGE("422 123 456")).toBe(true); // Batumi
    expect(validateGE("431 123 456")).toBe(true); // Kutaisi
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateGE("555 123 456")).toBe(true);
    expect(validateGE("555-123-456")).toBe(true);
    expect(validateGE("32 234 5678")).toBe(true);
  });

  test("should accept international format (+995)", () => {
    expect(validateGE("+995 555 123 456")).toBe(true);
    expect(validateGE("+995 32 234 5678")).toBe(true);
    expect(validateGE("995 555 123 456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateGE("555 123 45")).toBe(false);
    expect(validateGE("555 123 45678")).toBe(false);
    expect(validateGE("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateGE("155 123 456")).toBe(false);
    expect(validateGE("055 123 456")).toBe(false);
  });
});

