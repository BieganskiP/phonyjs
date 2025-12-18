import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Belizean phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 7 digits starting with 6 or 7
 * - Landline: 7 digits starting with 2, 3, 4, 5, or 8
 * - Handles international format (+501 prefix) and 00501 prefix
 *
 * Mobile prefixes: 6xx-xxxx, 7xx-xxxx
 * Landline prefixes:
 * - 2xx-xxxx: Belize City
 * - 3xx-xxxx, 4xx-xxxx, 5xx-xxxx, 8xx-xxxx: Other areas
 *
 * @example
 * validateBZ("612 3456") // { isValid: true } - Mobile
 * validateBZ("223 4567") // { isValid: true } - Landline Belize City
 * validateBZ("123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateBZ: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  if (digits.startsWith("00501") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("501") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length - Belizean numbers are 7 digits
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if first digit is valid
  // Mobile: 6, 7
  // Landline: 2, 3, 4, 5, 8
  if (!firstDigit || !["2", "3", "4", "5", "6", "7", "8"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Belize",
      }),
      details: { prefix: firstDigit || "unknown", country: "Belize" },
    };
  }

  // Validate Belizean phone number format
  if (!/^[2-8]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Belize",
      }),
      details: { country: "Belize" },
    };
  }

  return { isValid: true };
};


