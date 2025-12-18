import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bermuda phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 441
 * - Mobile and landline use same format: 441-XXX-XXXX
 * - Handles international format (+1-441 prefix) and 001441 prefix
 * - Total length with area code: 10 digits (1-441-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateBM("441 123 4567") // { isValid: true } - Standard format
 * validateBM("1 441 123 4567") // { isValid: true } - With country code
 * validateBM("+1 441 123 4567") // { isValid: true } - International format
 * validateBM("441 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateBM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001441")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1441")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("441")) {
    digits = digits.slice(3);
  }

  // Check length - Bermuda numbers are 7 digits after area code
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  // Validate Bermuda phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Bermuda",
      }),
      details: { country: "Bermuda" },
    };
  }

  return { isValid: true };
};


