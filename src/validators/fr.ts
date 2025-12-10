import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates French phone numbers with detailed error messages.
 *
 * Rules:
 * - Must be 10 digits
 * - Mobile numbers start with 06 or 07
 * - Landlines start with 01-05
 * - Special services start with 08-09
 * - Handles international format (+33 prefix) and 0033 prefix
 *
 * Note: This validator accepts mobile, landline, and special service numbers.
 *
 * @example
 * validateFR("06 12 34 56 78") // { isValid: true }
 * validateFR("00 12 34 56 78") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateFR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0033") && digits.length >= 13) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("33") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "France",
      }),
      details: { country: "France" },
    };
  }

  // Must be 10 digits starting with 0, followed by 1-9
  if (!/^0[1-9]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "France",
      }),
      details: { country: "France" },
    };
  }

  return { isValid: true };
};
