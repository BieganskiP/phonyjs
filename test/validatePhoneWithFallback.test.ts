import { describe, it, expect } from "vitest";
import { validatePhoneWithFallback } from "../src/validatePhone";

describe("validatePhoneWithFallback", () => {
  it("should use specific validator when available", () => {
    expect(validatePhoneWithFallback("us", "212-456-7890").isValid).toBe(true);
    expect(validatePhoneWithFallback("gb", "07912 345678").isValid).toBe(true);
    expect(validatePhoneWithFallback("us", "123").isValid).toBe(false);
  });

  it("should fallback to generic validator for unsupported countries", () => {
    // Valid generic phone number
    expect(validatePhoneWithFallback("zz", "+1234567890").isValid).toBe(true);
    expect(validatePhoneWithFallback("xx", "12345678901").isValid).toBe(true);

    // Invalid - too short
    expect(validatePhoneWithFallback("zz", "123").isValid).toBe(false);

    // Invalid - too long
    expect(validatePhoneWithFallback("zz", "1234567890123456").isValid).toBe(false);
  });

  it("should respect strict mode", () => {
    // With strict mode, unsupported countries return false
    expect(validatePhoneWithFallback("zz", "+1234567890", true).isValid).toBe(false);
    expect(validatePhoneWithFallback("xx", "12345678901", true).isValid).toBe(false);

    // Supported countries still work in strict mode
    expect(validatePhoneWithFallback("us", "212-456-7890", true).isValid).toBe(true);
    expect(validatePhoneWithFallback("us", "123", true).isValid).toBe(false);
  });
});




