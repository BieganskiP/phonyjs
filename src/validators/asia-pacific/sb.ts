import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Solomon Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 5-7 digits
 * - Mobile and landline use same format
 * - Handles international format (+677 prefix) and 00677 prefix
 *
 * @example
 * validateSB("12345") // { isValid: true }
 * validateSB("123 4567") // { isValid: true }
 */
export const validateSB: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00677") && digits.length >= 10) {
    digits = digits.slice(5);
  } else if (digits.startsWith("677") && digits.length >= 8) {
    digits = digits.slice(3);
  }

  // Check length - Solomon Islands accepts 5-7 digits
  if (digits.length < 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 5,
        got: digits.length,
      }),
      details: { expected: 5, got: digits.length },
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

  // Must be 5-7 digits
  if (!/^\d{5,7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Solomon Islands",
      }),
      details: { country: "Solomon Islands" },
    };
  }

  return { isValid: true };
};

