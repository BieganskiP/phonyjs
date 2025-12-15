import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Lithuanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits (excluding country code)
 * - Mobile numbers start with 6
 * - Landline numbers start with area codes (5 for Vilnius, etc.)
 * - Handles international format (+370 prefix) and 00370 prefix
 *
 * @example
 * validateLT("5 123 4567") // { isValid: true }
 * validateLT("612 34567") // { isValid: true }
 */
export const validateLT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00370") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("370") && digits.length >= 11) {
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

  // Must be 8 digits starting with 3-9 (not 0, 1, or 2)
  if (!/^[3-9]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Lithuania",
      }),
      details: { country: "Lithuania" },
    };
  }

  return { isValid: true };
};

