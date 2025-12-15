import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Kazakhstani phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 10 digits (excluding country code)
 * - Mobile numbers start with 7
 * - Landline numbers start with area codes (727 for Almaty, etc.)
 * - Handles international format (+7 prefix) and 007 prefix
 *
 * @example
 * validateKZ("727 123 4567") // { isValid: true }
 * validateKZ("701 234 5678") // { isValid: true }
 */
export const validateKZ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("007") && digits.length >= 13) {
    digits = digits.slice(3);
  } else if (digits.startsWith("7") && digits.length >= 11) {
    digits = digits.slice(1);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must be 10 digits starting with 7 (mobile) or area codes (7XX)
  if (!/^7\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Kazakhstan",
      }),
      details: { country: "Kazakhstan" },
    };
  }

  return { isValid: true };
};

