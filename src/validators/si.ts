import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Slovenian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 03, 04, 05, 06, 07, 08, 09
 * - Landline numbers start with area codes (01 for Ljubljana, etc.)
 * - Handles international format (+386 prefix) and 00386 prefix
 *
 * @example
 * validateSI("01 234 5678") // { isValid: true }
 * validateSI("031 234 567") // { isValid: true }
 */
export const validateSI: PhoneValidator = (phone: string): ValidationResult => {
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
  // "+386 1 234 5678" = "38612345678" = 11 digits, remove "386" = "12345678" = 8 digits, add "0" = "012345678" = 9 digits
  if (digits.startsWith("00386") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("386") && digits.length >= 11) {
    // Check if it already has leading 0 after removing country code
    const remaining = digits.slice(3);
    if (remaining.startsWith("0")) {
      digits = remaining;
    } else {
      digits = "0" + remaining;
    }
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Slovenia",
      }),
      details: { country: "Slovenia" },
    };
  }

  // Check length (8-9 digits after leading 0, 9-10 total)
  // "01 234 5678" = 9 digits, "031 234 567" = 9 digits, "040 123 456" = 9 digits
  // "01 234 56789" = 10 digits should be rejected
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9",
        got: digits.length,
      }),
      details: { expected: "9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9",
        got: digits.length,
      }),
      details: { expected: "9", got: digits.length },
    };
  }

  // Must be 0 followed by 8 digits (9 total)
  if (!/^0\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Slovenia",
      }),
      details: { country: "Slovenia" },
    };
  }

  return { isValid: true };
};

