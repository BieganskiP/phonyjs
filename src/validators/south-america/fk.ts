import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Falkland Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 5 digits after country code 500
 * - Mobile and landline use same format: 500-XXXXX
 * - Handles international format (+500 prefix) and 00500 prefix
 * - Total length: 5 digits after country code
 *
 * @example
 * validateFK("500 12345") // { isValid: true } - Standard format
 * validateFK("+500 12345") // { isValid: true } - International format
 * validateFK("00500 12345") // { isValid: true } - International format
 * validateFK("500 1234") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateFK: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00500")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("500") && digits.length > 3) {
    // Only remove country code if there are digits after it
    digits = digits.slice(3);
  }

  // Check length - Falkland Islands numbers are 5 digits after country code
  if (digits.length < 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "5",
        got: digits.length,
      }),
      details: { expected: "5", got: digits.length },
    };
  }

  if (digits.length > 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "5",
        got: digits.length,
      }),
      details: { expected: "5", got: digits.length },
    };
  }

  // Validate Falkland Islands phone number format (5 digits)
  if (!/^\d{5}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Falkland Islands",
      }),
      details: { country: "Falkland Islands" },
    };
  }

  return { isValid: true };
};


