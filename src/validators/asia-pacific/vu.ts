import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Vanuatu phone numbers with detailed error messages.
 *
 * Rules:
 * - Landline: 5 digits starting with 22 (22 XXX)
 * - Mobile: 5 digits starting with 77 (77 XXX)
 * - Handles international format (+678 prefix) and 00678 prefix
 *
 * @example
 * validateVU("22 123") // { isValid: true }
 * validateVU("77 456") // { isValid: true }
 */
export const validateVU: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00678") && digits.length >= 10) {
    digits = digits.slice(5);
  } else if (digits.startsWith("678") && digits.length >= 8) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 5,
        got: digits.length,
      }),
      details: { expected: 5, got: digits.length },
    };
  }

  if (digits.length > 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 5,
        got: digits.length,
      }),
      details: { expected: 5, got: digits.length },
    };
  }

  // Must be 5 digits starting with 22 (landline) or 77 (mobile)
  if (!/^(22|77)\d{3}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Vanuatu",
      }),
      details: { country: "Vanuatu" },
    };
  }

  return { isValid: true };
};

