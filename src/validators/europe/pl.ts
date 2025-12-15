import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Polish phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits
 * - Mobile numbers start with 4, 5, 6, 7, or 8
 * - Landline numbers start with 1, 2, or 3 (area codes)
 * - Cannot start with 9 (reserved for special services)
 * - Handles international format (+48 prefix) and 0048 prefix
 *
 * @example
 * validatePL("500 123 456") // { isValid: true }
 * validatePL("900 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validatePL: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0048") && digits.length >= 13) {
    digits = digits.slice(4);
  } else if (digits.startsWith("48") && digits.length >= 11) {
    digits = digits.slice(2);
  }

  // Check length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  // Must be 9 digits starting with 1-8 (landline 1-3, mobile 4-8)
  // Cannot start with 9 (reserved for special services)
  if (!/^[1-8]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Poland",
      }),
      details: { country: "Poland" },
    };
  }

  return { isValid: true };
};
