import { describe, test, expect } from "vitest";
import { validateBA } from "../src/validators/ba";

describe("validateBA - Bosnia and Herzegovina phone numbers", () => {
  test("should accept valid Bosnian mobile numbers", () => {
    expect(validateBA("061 123 456")).toBe(true);
    expect(validateBA("062 123 456")).toBe(true);
    expect(validateBA("065 123 456")).toBe(true);
  });

  test("should accept Bosnian landline numbers", () => {
    expect(validateBA("33 123 456")).toBe(true); // Sarajevo
    expect(validateBA("51 234 567")).toBe(true); // Banja Luka
    expect(validateBA("35 123 456")).toBe(true); // Mostar
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBA("061 123 456")).toBe(true);
    expect(validateBA("061-123-456")).toBe(true);
    expect(validateBA("33 123 456")).toBe(true);
  });

  test("should accept international format (+387)", () => {
    expect(validateBA("+387 61 123 456")).toBe(true);
    expect(validateBA("+387 33 123 456")).toBe(true);
    expect(validateBA("387 61 123 456")).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateBA("061 123 45")).toBe(false);
    expect(validateBA("061 123 45678")).toBe(false);
    expect(validateBA("")).toBe(false);
  });

  test("should reject invalid prefixes", () => {
    expect(validateBA("070 123 456")).toBe(false);
    expect(validateBA("00 123 456")).toBe(false);
  });
});

