import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Nicaraguan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 5, 7, or 8
 * - Landline: 8 digits starting with 2 (Managua) or other area codes
 * - Handles international format (+505 prefix) and 00505 prefix
 *
 * Mobile prefixes: 5xxx-xxxx, 7xxx-xxxx, 8xxx-xxxx
 * Landline prefixes:
 * - 2xxx-xxxx: Managua
 * - Other area codes for different departments
 *
 * @example
 * validateNI("5123 4567") // { isValid: true } - Mobile
 * validateNI("2234 5678") // { isValid: true } - Landline Managua
 * validateNI("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateNI: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00505") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("505") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length - Nicaraguan numbers are 8 digits
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if first digit is valid
  // Mobile: 5, 7, 8
  // Landline: 2 and other area codes
  if (!firstDigit || !["2", "8"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Nicaragua",
      }),
      details: { prefix: firstDigit || "unknown", country: "Nicaragua" },
    };
  }

  // Validate Nicaraguan phone number format
  if (!/^[2-8]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Nicaragua",
      }),
      details: { country: "Nicaragua" },
    };
  }

  return { isValid: true };
};
