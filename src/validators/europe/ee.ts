import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Estonian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain 7-8 digits (excluding country code)
 * - Mobile numbers start with 5
 * - Landline numbers start with area codes (6 for Tallinn, etc.)
 * - Handles international format (+372 prefix) and 00372 prefix
 *
 * @example
 * validateEE("6 123 456") // { isValid: true }
 * validateEE("512 3456") // { isValid: true }
 */
export const validateEE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00372") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("372") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length (7-8 digits)
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  // Mobile numbers start with 5 (7-8 digits)
  if (digits.startsWith("5")) {
    return { isValid: true };
  }

  // Landline numbers start with 6, 7, or 8 (7-8 digits)
  if (/^[6-8]\d{6,7}$/.test(digits)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Estonia",
    }),
    details: { country: "Estonia" },
  };
};

