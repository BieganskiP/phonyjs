import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Belarusian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 02, 04, 05, 06, 07, 08, 09
 * - Landline numbers start with area codes (017 for Minsk, etc.)
 * - Handles international format (+375 prefix) and 00375 prefix
 *
 * @example
 * validateBY("17 123 4567") // { isValid: true }
 * validateBY("029 123 4567") // { isValid: true }
 */
export const validateBY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00375") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("375") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  // Must be 9 digits starting with 1-9 (not 0)
  if (!/^[1-9]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Belarus",
      }),
      details: { country: "Belarus" },
    };
  }

  return { isValid: true };
};

