import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Ecuadorian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 0, then area code (2 digits) and number (7 digits)
 * - Landline: 7-8 digits depending on area code
 * - Handles international format (+593 prefix) and 00593 prefix
 * - Mobile format: 0XX-XXX-XXXX (9 digits total)
 * - Landline format: XX-XXX-XXXX or XXX-XXXX (7-8 digits)
 *
 * Mobile prefixes: 0XX-XXX-XXXX
 * Landline prefixes: Various area codes
 *
 * @example
 * validateEC("09 123 4567") // { isValid: true } - Mobile
 * validateEC("2 123 4567") // { isValid: true } - Landline Quito
 * validateEC("593 9 123 4567") // { isValid: true } - With country code
 * validateEC("1123 4567") // { isValid: false, errorCode: "INVALID_FORMAT", ... }
 */
export const validateEC: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00593")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("593")) {
    digits = digits.slice(3);
  }

  // Check if it's a mobile number (starts with 0, then 8 more digits = 9 total)
  if (digits.startsWith("0")) {
    // Mobile should be exactly 9 digits
    if (digits.length === 9) {
      return { isValid: true };
    }
    if (digits.length < 9) {
      return {
        isValid: false,
        errorCode: ErrorCodes.TOO_SHORT,
        message: getMessage(ErrorCodes.TOO_SHORT, {
          expected: "9",
          got: digits.length,
        }),
        details: { expected: "9", got: digits.length },
      };
    }
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9",
        got: digits.length,
      }),
      details: { expected: "9", got: digits.length },
    };
  }

  // Landline numbers: 7-8 digits (not starting with 0)
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
        expected: "8",
        got: digits.length,
      }),
      details: { expected: "8", got: digits.length },
    };
  }

  return { isValid: true };
};


