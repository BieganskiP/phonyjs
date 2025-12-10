import { describe, it, expect } from "vitest";
import { validatePhone, isValidPhone } from "../src/validatePhone";
import { ErrorCodes } from "../src/errorCodes";

describe("validatePhone", () => {
  it("should return valid result for correct phone numbers", () => {
    const result = validatePhone("us", "212-456-7890");
    expect(result.isValid).toBe(true);
    expect(result.errorCode).toBeUndefined();
    expect(result.message).toBeUndefined();
  });

  it("should return error for invalid phone numbers", () => {
    const result = validatePhone("us", "123");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.TOO_SHORT);
    expect(result.message).toMatch(/too short|Too short/i);
  });

  it("should return error for unsupported country", () => {
    const result = validatePhone("zz", "123456789");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.UNSUPPORTED_COUNTRY);
    expect(result.message).toContain("Unsupported country code");
  });

  it("should provide error codes for frontend i18n", () => {
    const result = validatePhone("us", "123");
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.TOO_SHORT);
    expect(result.message).toBeDefined();
  });

  it("should work with countries without detailed validators", () => {
    // Poland has a detailed validator
    const validResult = validatePhone("pl", "+48 501 234 567");
    expect(validResult.isValid).toBe(true);

    const invalidResult = validatePhone("pl", "123");
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });
});

describe("isValidPhone", () => {
  it("should return true for valid numbers", () => {
    expect(isValidPhone("us", "212-456-7890")).toBe(true);
    expect(isValidPhone("gb", "07912 345678")).toBe(true);
    expect(isValidPhone("sa", "050 123 4567")).toBe(true);
  });

  it("should return false for invalid numbers", () => {
    expect(isValidPhone("us", "123")).toBe(false);
    expect(isValidPhone("gb", "123")).toBe(false);
    expect(isValidPhone("sa", "123")).toBe(false);
  });

  it("should return false for unsupported country", () => {
    expect(isValidPhone("zz", "123456789")).toBe(false);
  });
});




