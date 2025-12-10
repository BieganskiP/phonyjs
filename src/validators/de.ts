import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates German phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile numbers: 10-11 digits starting with 015, 016, or 017
 * - Landline numbers: Variable length (5-14 digits) with area codes
 * - Handles international format (+49 prefix) and 0049 prefix
 *
 * @example
 * validateDE("0151 12345678") // { isValid: true }
 * validateDE("0141 12345678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateDE: PhoneValidator = (phone: string): ValidationResult => {
  // Strip all non-digit characters (letters, spaces, hyphens, etc.)
  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  if (digits.startsWith("0049") && digits.length >= 7) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("49") && digits.length >= 5) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "5-14",
        got: digits.length,
      }),
      details: { expected: "5-14", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 14) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "5-14",
        got: digits.length,
      }),
      details: { expected: "5-14", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Germany",
      }),
      details: { country: "Germany" },
    };
  }

  // Mobile: 01[567] + 7-8 digits (10-11 total)
  if (/^01[567]/.test(digits)) {
    if (digits.length < 10 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-11", got: digits.length, type: "mobile" }
        ),
        details: { expected: "10-11", got: digits.length, type: "mobile" },
      };
    }

    if (!/^01[567]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Germany",
          type: "mobile",
        }),
        details: { country: "Germany", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-9] + variable length (5-14 digits total)
  if (/^0[2-9]/.test(digits)) {
    if (!/^0[2-9]\d{3,12}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Germany",
          type: "landline",
        }),
        details: { country: "Germany", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["015, 016, 017 (mobile)", "02-09 (landline)"],
      country: "Germany",
    }),
    details: {
      validPrefixes: ["015, 016, 017 (mobile)", "02-09 (landline)"],
      country: "Germany",
    },
  };
};
