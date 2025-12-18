import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates British Virgin Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 284
 * - Mobile and landline use same format: 284-XXX-XXXX
 * - Handles international format (+1-284 prefix) and 001284 prefix
 * - Total length with area code: 10 digits (1-284-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateVG("284 123 4567") // { isValid: true } - Standard format
 * validateVG("1 284 123 4567") // { isValid: true } - With country code
 * validateVG("+1 284 123 4567") // { isValid: true } - International format
 * validateVG("284 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateVG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001284")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1284")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("284")) {
    digits = digits.slice(3);
  }

  // Check length - British Virgin Islands numbers are 7 digits after area code
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

  // Validate British Virgin Islands phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "British Virgin Islands",
      }),
      details: { country: "British Virgin Islands" },
    };
  }

  return { isValid: true };
};


