import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Sint Maarten phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 721
 * - Mobile and landline use same format: 721-XXX-XXXX
 * - Handles international format (+1-721 prefix) and 001721 prefix
 * - Total length with area code: 10 digits (1-721-XXX-XXXX)
 * - Part of NANP (North American Numbering Plan)
 *
 * @example
 * validateSX("721 123 4567") // { isValid: true } - Standard format
 * validateSX("1 721 123 4567") // { isValid: true } - With country code
 * validateSX("+1 721 123 4567") // { isValid: true } - International format
 * validateSX("721 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateSX: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001721")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1721")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("721")) {
    digits = digits.slice(3);
  }

  // Check length - Sint Maarten numbers are 7 digits after area code
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

  // Validate Sint Maarten phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Sint Maarten",
      }),
      details: { country: "Sint Maarten" },
    };
  }

  return { isValid: true };
};


