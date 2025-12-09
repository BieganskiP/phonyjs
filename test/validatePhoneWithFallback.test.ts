import { describe, test, expect } from "vitest";
import { validatePhoneWithFallback } from "../src";

describe("validatePhoneWithFallback", () => {
  describe("with specific validators", () => {
    test("should use specific validator when available", () => {
      // Poland - specific validator
      expect(validatePhoneWithFallback("pl", "500123456")).toBe(true);
      expect(validatePhoneWithFallback("pl", "123456789")).toBe(false); // invalid prefix

      // US - specific validator
      expect(validatePhoneWithFallback("us", "212-456-7890")).toBe(true);
      expect(validatePhoneWithFallback("us", "012-456-7890")).toBe(false); // invalid area code

      // GB - specific validator
      expect(validatePhoneWithFallback("gb", "07912345678")).toBe(true);
      expect(validatePhoneWithFallback("gb", "07012345678")).toBe(false); // 070 not mobile

      // SA - specific validator
      expect(validatePhoneWithFallback("sa", "0501234567")).toBe(true);
      expect(validatePhoneWithFallback("sa", "0511234567")).toBe(false); // invalid prefix
    });
  });

  describe("with generic fallback", () => {
    test("should use generic validator for unsupported countries", () => {
      // Japan (no specific validator)
      expect(validatePhoneWithFallback("jp", "09012345678")).toBe(true); // 11 digits, valid
      expect(validatePhoneWithFallback("jp", "123")).toBe(false); // too short
      
      // Italy (no specific validator)
      expect(validatePhoneWithFallback("it", "3123456789")).toBe(true); // 10 digits, valid
      expect(validatePhoneWithFallback("it", "12345")).toBe(false); // too short
      
      // Spain (no specific validator)
      expect(validatePhoneWithFallback("es", "612345678")).toBe(true); // 9 digits, valid
    });
  });

  describe("strict mode", () => {
    test("should reject unsupported countries in strict mode", () => {
      // Japan (no specific validator)
      expect(
        validatePhoneWithFallback("jp", "09012345678", { strict: true })
      ).toBe(false);

      // Italy (no specific validator)
      expect(
        validatePhoneWithFallback("it", "3123456789", { strict: true })
      ).toBe(false);

      // But should still validate supported countries
      expect(
        validatePhoneWithFallback("pl", "500123456", { strict: true })
      ).toBe(true);
      expect(
        validatePhoneWithFallback("us", "212-456-7890", { strict: true })
      ).toBe(true);
      expect(
        validatePhoneWithFallback("fr", "0612345678", { strict: true })
      ).toBe(true);
      expect(
        validatePhoneWithFallback("de", "015112345678", { strict: true })
      ).toBe(true);
    });
  });

  describe("edge cases", () => {
    test("should handle empty strings", () => {
      expect(validatePhoneWithFallback("fr", "")).toBe(false);
      expect(validatePhoneWithFallback("pl", "")).toBe(false);
    });

    test("should handle very long strings", () => {
      const longNumber = "1".repeat(20);
      expect(validatePhoneWithFallback("fr", longNumber)).toBe(false); // too long for generic
    });

    test("should handle all zeros", () => {
      expect(validatePhoneWithFallback("fr", "0000000000")).toBe(false);
    });
  });
});
