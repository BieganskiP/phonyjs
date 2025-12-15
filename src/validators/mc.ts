import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Monacan phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits (excluding country code)
 * - Numbers start with 9
 * - Handles international format (+377 prefix) and 00377 prefix
 *
 * @example
 * validateMC("93 15 67 89") // { isValid: true }
 * validateMC("9912 3456") // { isValid: true }
 */
export const validateMC: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00377") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("377") && digits.length >= 11) {
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

  // Must be 8 digits starting with 9
  if (!/^9\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Monaco",
      }),
      details: { country: "Monaco" },
    };
  }

  return { isValid: true };
};

