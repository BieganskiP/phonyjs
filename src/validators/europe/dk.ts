import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Danish phone numbers with detailed error messages.
 *
 * Rules:
 * - All Danish numbers are 8 digits
 * - No distinction between mobile and landline in format
 * - Handles international format (+45 prefix) and 0045 prefix
 *
 * Note: Denmark does not use area codes, and mobile/landline cannot
 * be distinguished by prefix alone in modern numbering.
 *
 * @example
 * validateDK("12 34 56 78") // { isValid: true }
 * validateDK("12 345 678") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateDK: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0045") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("45") && digits.length >= 10) {
    digits = digits.slice(2);
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

  // Must be exactly 8 digits
  if (!/^\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Denmark",
      }),
      details: { country: "Denmark" },
    };
  }

  return { isValid: true };
};
