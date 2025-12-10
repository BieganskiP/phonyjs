import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Philippine phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 09xx
 * - Landline: 9-11 digits with area codes (e.g., 02-Manila, 032-Cebu)
 * - Handles international format (+63 prefix) and 0063 prefix
 *
 * Mobile prefixes: 0905-0999 (various operators)
 * Major area codes:
 * - 02: Metro Manila
 * - 032: Cebu
 * - 082: Davao
 * - 045: Pampanga
 *
 * @example
 * validatePH("0917 123 4567") // { isValid: true }
 * validatePH("0117 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validatePH: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0063") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("63") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Philippines",
      }),
      details: { country: "Philippines" },
    };
  }

  // Mobile: 09xx followed by 8 digits (11 total)
  if (digits.startsWith("09")) {
    if (digits.length !== 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 11, got: digits.length, type: "mobile" }
        ),
        details: { expected: 11, got: digits.length, type: "mobile" },
      };
    }

    if (!/^09\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Philippines",
          type: "mobile",
        }),
        details: { country: "Philippines", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-8] (not 09) followed by 7-9 digits (9-11 total)
  if (/^0[2-8]/.test(digits)) {
    if (digits.length < 9 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-11", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-11", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[2-8]\d{7,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Philippines",
          type: "landline",
        }),
        details: { country: "Philippines", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["09 (mobile)", "02-08 (landline)"],
      country: "Philippines",
    }),
    details: {
      validPrefixes: ["09 (mobile)", "02-08 (landline)"],
      country: "Philippines",
    },
  };
};

