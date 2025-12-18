import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Trinidad and Tobago phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 868
 * - Mobile and landline use same format: 868-XXX-XXXX
 * - Handles international format (+1-868 prefix) and 001868 prefix
 * - Total length with area code: 10 digits (1-868-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateTT("868 123 4567") // { isValid: true } - Standard format
 * validateTT("1 868 123 4567") // { isValid: true } - With country code
 * validateTT("+1 868 123 4567") // { isValid: true } - International format
 * validateTT("868 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateTT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001868")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1868")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("868")) {
    digits = digits.slice(3);
  }

  // Check length - Trinidad and Tobago numbers are 7 digits after area code
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

  // Validate Trinidad and Tobago phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Trinidad and Tobago",
      }),
      details: { country: "Trinidad and Tobago" },
    };
  }

  return { isValid: true };
};


