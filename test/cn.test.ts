import { describe, test, expect } from "vitest";
import { validateCN } from "../src/validators/cn";

describe("validateCN - Chinese phone numbers", () => {
  test("should accept valid Chinese mobile numbers", () => {
    expect(validateCN("13800138000")).toBe(true);
    expect(validateCN("15912345678")).toBe(true);
    expect(validateCN("18612345678")).toBe(true);
    expect(validateCN("19812345678")).toBe(true);
  });

  test("should accept Chinese landline numbers", () => {
    expect(validateCN("01012345678")).toBe(true); // Beijing
    expect(validateCN("02112345678")).toBe(true); // Shanghai
    expect(validateCN("02012345678")).toBe(true); // Guangzhou
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCN("138 0013 8000")).toBe(true);
    expect(validateCN("138-0013-8000")).toBe(true);
    expect(validateCN("010 1234 5678")).toBe(true);
  });

  test("should accept international format (+86)", () => {
    expect(validateCN("+86 138 0013 8000")).toBe(true); // mobile
    expect(validateCN("+86 10 1234 5678")).toBe(true); // landline Beijing
    expect(validateCN("86 138 0013 8000")).toBe(true);
  });

  test("should reject phone numbers with incorrect prefix", () => {
    expect(validateCN("12012345678")).toBe(false); // mobile must start 13-19
    expect(validateCN("11012345678")).toBe(false);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCN("1380013800")).toBe(false); // too short
    expect(validateCN("138001380000")).toBe(false); // too long
    expect(validateCN("138")).toBe(false);
    expect(validateCN("")).toBe(false);
  });
});

