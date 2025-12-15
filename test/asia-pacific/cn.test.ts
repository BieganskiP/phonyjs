import { describe, test, expect } from "vitest";
import { validateCN } from "../../src/validators/asia-pacific/cn";

describe("validateCN - Chinese phone numbers", () => {
  test("should accept valid Chinese mobile numbers", () => {
    expect(validateCN("13800138000").isValid).toBe(true);
    expect(validateCN("15912345678").isValid).toBe(true);
    expect(validateCN("18612345678").isValid).toBe(true);
    expect(validateCN("19812345678").isValid).toBe(true);
  });

  test("should accept Chinese landline numbers", () => {
    expect(validateCN("01012345678").isValid).toBe(true); // Beijing
    expect(validateCN("02112345678").isValid).toBe(true); // Shanghai
    expect(validateCN("02012345678").isValid).toBe(true); // Guangzhou
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateCN("138 0013 8000").isValid).toBe(true);
    expect(validateCN("138-0013-8000").isValid).toBe(true);
    expect(validateCN("010 1234 5678").isValid).toBe(true);
  });

  test("should accept international format (+86)", () => {
    expect(validateCN("+86 138 0013 8000").isValid).toBe(true); // mobile
    expect(validateCN("+86 10 1234 5678").isValid).toBe(true); // landline Beijing
    expect(validateCN("86 138 0013 8000").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect prefix", () => {
    expect(validateCN("12012345678").isValid).toBe(false); // mobile must start 13-19
    expect(validateCN("11012345678").isValid).toBe(false);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateCN("1380013800").isValid).toBe(false); // too short
    expect(validateCN("138001380000").isValid).toBe(false); // too long
    expect(validateCN("138").isValid).toBe(false);
    expect(validateCN("").isValid).toBe(false);
  });
});





