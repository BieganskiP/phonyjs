import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Macau phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 8 digits (XXXX XXXX)
 * - Mobile and landline use same format
 * - Handles international format (+853 prefix) and 00853 prefix
 *
 * @example
 * validateMO("1234 5678") // { isValid: true }
 * validateMO("+853 1234 5678") // { isValid: true }
 */
export const validateMO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00853") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("853") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  // Must be 8 digits
  if (!/^\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Macau",
      }),
      details: { country: "Macau" },
    };
  }

  return { isValid: true };
};

