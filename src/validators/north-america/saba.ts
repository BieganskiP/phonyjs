import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Saba phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after country code 599 and area code 4
 * - Format: 599-4-XXX-XXXX
 * - Handles international format (+599-4 prefix) and 005994 prefix
 * - Total length: 7 digits after area code 4
 *
 * @example
 * validateSaba("599 4 123 4567") // { isValid: true } - Standard format
 * validateSaba("+599 4 123 4567") // { isValid: true } - International format
 * validateSaba("005994 1234567") // { isValid: true } - International format
 * validateSaba("599 4 12345") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateSaba: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("005994")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("5994")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("599") && digits[3] === "4") {
    digits = digits.slice(4);
  } else if (digits.startsWith("4") && digits.length === 8) {
    // Handle numbers starting with area code 4 (4XXXXXXX = 8 digits total)
    digits = digits.slice(1);
  }

  // Check length - Saba numbers are 7 digits after area code 4
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

  // Validate Saba phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Saba",
      }),
      details: { country: "Saba" },
    };
  }

  return { isValid: true };
};
