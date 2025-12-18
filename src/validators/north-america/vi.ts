import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates US Virgin Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 340
 * - Mobile and landline use same format: 340-XXX-XXXX
 * - Handles international format (+1-340 prefix) and 001340 prefix
 * - Total length with area code: 10 digits (1-340-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateVI("340 123 4567") // { isValid: true } - Standard format
 * validateVI("1 340 123 4567") // { isValid: true } - With country code
 * validateVI("+1 340 123 4567") // { isValid: true } - International format
 * validateVI("340 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateVI: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001340")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1340")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("340")) {
    digits = digits.slice(3);
  }

  // Check length - US Virgin Islands numbers are 7 digits after area code
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

  // Validate US Virgin Islands phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "US Virgin Islands",
      }),
      details: { country: "US Virgin Islands" },
    };
  }

  return { isValid: true };
};


