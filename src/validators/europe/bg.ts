import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bulgarian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 08 or 09
 * - Landline: 8-9 digits with area codes (02 for Sofia, etc.)
 * - Handles international format (+359 prefix) and 00359 prefix
 *
 * @example
 * validateBG("02 123 4567") // { isValid: true }
 * validateBG("088 123 4567") // { isValid: true }
 */
export const validateBG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00359") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("359") && digits.length >= 11) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Bulgaria",
      }),
      details: { country: "Bulgaria" },
    };
  }

  // Mobile: 08 or 09 followed by 8 digits (10 total)
  if (digits.startsWith("08") || digits.startsWith("09")) {
    if (digits.length === 10) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 10,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 10, got: digits.length, type: "mobile" },
    };
  }

  // Landline: 0 + area code (1-2 digits) + subscriber (6-7 digits) = 9 total
  // "02 123 456" = 8 digits (too short), "02 123 4567" = 9 digits (valid)
  if (digits.length === 9) {
    // Area codes: 02 (Sofia), 032 (Plovdiv), etc.
    if (/^0[1-9]\d{7,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Reject landlines that are too short (8 digits)
  if (digits.length === 8 && digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
        type: "landline",
      }),
      details: { expected: 9, got: digits.length, type: "landline" },
    };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Bulgaria",
    }),
    details: { country: "Bulgaria" },
  };
};

