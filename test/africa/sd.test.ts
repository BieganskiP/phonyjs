import { describe, test, expect } from "vitest";
import { validateSD } from "../../src/validators/africa/sd";

describe("validateSD - Sudanese phone numbers", () => {
  test("should accept valid Sudanese mobile numbers", () => {
    expect(validateSD("091 234 5678").isValid).toBe(true); // Zain
    expect(validateSD("099 234 5678").isValid).toBe(true); // Sudani
    expect(validateSD("095 234 5678").isValid).toBe(true); // MTN
    expect(validateSD("912345678").isValid).toBe(true); // no formatting
  });

  test("should accept Sudanese landline numbers", () => {
    expect(validateSD("15 234 5678").isValid).toBe(true); // Khartoum
    expect(validateSD("18 234 5678").isValid).toBe(true); // Omdurman
    expect(validateSD("41 234 5678").isValid).toBe(true); // Port Sudan
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateSD("091 234 5678").isValid).toBe(true);
    expect(validateSD("091-234-5678").isValid).toBe(true);
    expect(validateSD("15 234 5678").isValid).toBe(true);
  });

  test("should accept international format (+249)", () => {
    expect(validateSD("+249 91 234 5678").isValid).toBe(true); // mobile
    expect(validateSD("+249 15 234 5678").isValid).toBe(true); // landline
    expect(validateSD("249 91 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateSD("091 234 567").isValid).toBe(false); // too short
    expect(validateSD("091 234 56789").isValid).toBe(false); // too long
    expect(validateSD("091").isValid).toBe(false);
    expect(validateSD("").isValid).toBe(false);
  });

  test("should accept numbers with leading zero for mobile", () => {
    expect(validateSD("091 234 5678").isValid).toBe(true); // valid mobile with 0
    expect(validateSD("91 234 5678").isValid).toBe(true); // valid mobile without 0
  });
});



