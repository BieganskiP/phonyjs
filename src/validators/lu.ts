import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Luxembourg phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain 6-9 digits (excluding country code)
 * - No area codes, all numbers are national
 * - Handles international format (+352 prefix) and 00352 prefix
 *
 * @example
 * validateLU("27 123 456") // { isValid: true }
 * validateLU("621 123 456") // { isValid: true }
 */
export const validateLU: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00352") && digits.length >= 11) {
    digits = digits.slice(5);
  } else if (digits.startsWith("352") && digits.length >= 9) {
    digits = digits.slice(3);
  }

  // Check length (6-9 digits)
  if (digits.length < 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "6-9",
        got: digits.length,
      }),
      details: { expected: "6-9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "6-9",
        got: digits.length,
      }),
      details: { expected: "6-9", got: digits.length },
    };
  }

  // Must be 6-9 digits
  if (!/^\d{6,9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Luxembourg",
      }),
      details: { country: "Luxembourg" },
    };
  }

  return { isValid: true };
};

