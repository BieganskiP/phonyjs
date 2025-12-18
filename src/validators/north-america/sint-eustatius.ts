import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Sint Eustatius phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after country code 599 and area code 3
 * - Format: 599-3-XXX-XXXX
 * - Handles international format (+599-3 prefix) and 005993 prefix
 * - Total length: 7 digits after area code 3
 *
 * @example
 * validateSintEustatius("599 3 123 4567") // { isValid: true } - Standard format
 * validateSintEustatius("+599 3 123 4567") // { isValid: true } - International format
 * validateSintEustatius("005993 1234567") // { isValid: true } - International format
 * validateSintEustatius("599 3 12345") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateSintEustatius: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("005993")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("5993")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("599") && digits[3] === "3") {
    digits = digits.slice(4);
  } else if (digits.startsWith("3") && digits.length === 8) {
    // Handle numbers starting with area code 3 (3XXXXXXX = 8 digits total)
    digits = digits.slice(1);
  }

  // Check length - Sint Eustatius numbers are 7 digits after area code 3
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

  // Validate Sint Eustatius phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Sint Eustatius",
      }),
      details: { country: "Sint Eustatius" },
    };
  }

  return { isValid: true };
};
