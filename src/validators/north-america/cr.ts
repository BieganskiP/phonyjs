import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Costa Rican phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6, 7, or 8
 * - Landline: 8 digits starting with 2 (San José area) or other area codes
 * - Handles international format (+506 prefix) and 00506 prefix
 *
 * Mobile prefixes: 6xxx-xxxx, 7xxx-xxxx, 8xxx-xxxx
 * Landline prefixes:
 * - 2xxx-xxxx: San José and surrounding areas
 * - Other area codes for different provinces
 *
 * @example
 * validateCR("6123 4567") // { isValid: true }
 * validateCR("2234 5678") // { isValid: true }
 * validateCR("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00506") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("506") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
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
  // Mobile: 6, 7, 8
  // Landline: 2 and other area codes
  if (!firstDigit || !["2", "6"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit,
        country: "Costa Rica",
      }),
      details: { prefix: firstDigit, country: "Costa Rica" },
    };
  }

  // Validate Costa Rican phone number format
  if (!/^[2678]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Costa Rica",
      }),
      details: { country: "Costa Rica" },
    };
  }

  return { isValid: true };
};
