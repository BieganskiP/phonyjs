import { describe, test, expect } from "vitest";
import { validatePhone } from "../src";

describe("validatePhone - main function", () => {
  describe("Polish (pl) validation", () => {
    test("should validate Polish phone numbers", () => {
      expect(validatePhone("pl", "500 123 456")).toBe(true);
      expect(validatePhone("pl", "600123456")).toBe(true);
      expect(validatePhone("pl", "700123456")).toBe(true);
      expect(validatePhone("pl", "123456789")).toBe(false); // invalid prefix
      expect(validatePhone("pl", "123")).toBe(false); // too short
    });
  });

  describe("US (us) validation", () => {
    test("should validate US phone numbers", () => {
      expect(validatePhone("us", "212-456-7890")).toBe(true);
      expect(validatePhone("us", "1-212-456-7890")).toBe(true);
      expect(validatePhone("us", "0125551234")).toBe(false);
    });
  });

  describe("UK (gb) validation", () => {
    test("should validate UK phone numbers", () => {
      expect(validatePhone("gb", "07123 456789")).toBe(true);
      expect(validatePhone("gb", "07912345678")).toBe(true);
      expect(validatePhone("gb", "08123456789")).toBe(false);
    });
  });

  describe("type safety", () => {
    test("should work with all supported country codes", () => {
      // This test mainly validates that TypeScript compilation works
      const codes = ["pl", "us", "gb"] as const;

      codes.forEach((code) => {
        const result = validatePhone(code, "1234567890");
        expect(typeof result).toBe("boolean");
      });
    });
  });

  describe("edge cases", () => {
    test("should handle empty strings", () => {
      expect(validatePhone("pl", "")).toBe(false);
      expect(validatePhone("us", "")).toBe(false);
      expect(validatePhone("gb", "")).toBe(false);
    });

    test("should handle strings with only special characters", () => {
      expect(validatePhone("pl", "---")).toBe(false);
      expect(validatePhone("us", "()()()")).toBe(false);
      expect(validatePhone("gb", "+++")).toBe(false);
    });

    test("should handle very long strings", () => {
      const longString = "1".repeat(100);
      expect(validatePhone("pl", longString)).toBe(false);
      expect(validatePhone("us", longString)).toBe(false);
      expect(validatePhone("gb", longString)).toBe(false);
    });
  });
});
