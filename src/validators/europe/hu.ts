import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Hungarian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 20, 30, or 70
 * - Landline: 7-9 digits with area codes (e.g., 1-Budapest, 62-Szeged)
 * - Handles international format (+36 prefix) and 0036 prefix
 *
 * Mobile prefixes: 20, 30, 31, 70
 * Major area codes:
 * - 1: Budapest
 * - 62: Szeged
 * - 52: Debrecen
 * - 96: Győr
 *
 * @example
 * validateHU("20 123 4567") // { isValid: true }
 * validateHU("40 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateHU: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0036") && digits.length >= 10) {
    digits = digits.slice(4);
  } else if (digits.startsWith("36") && digits.length >= 8) {
    digits = digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Mobile: starts with 20, 30, 31, or 70 (always 9 digits exactly)
  const mobilePrefix = digits.slice(0, 2);
  const validMobilePrefixes = ["20", "30", "31", "70"];

  if (validMobilePrefixes.includes(mobilePrefix)) {
    if (digits.length !== 9) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 9, got: digits.length, type: "mobile" }
        ),
        details: { expected: 9, got: digits.length, type: "mobile" },
      };
    }

    if (!/^(20|30|31|70)\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Hungary",
          type: "mobile",
        }),
        details: { country: "Hungary", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: starts with 1-9 (not mobile prefixes), 7-9 digits total
  if (/^[1-9]/.test(digits)) {
    if (!/^[1-9]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Hungary",
          type: "landline",
        }),
        details: { country: "Hungary", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["20, 30, 31, 70 (mobile)", "1-9 (landline)"],
      country: "Hungary",
    }),
    details: {
      validPrefixes: ["20, 30, 31, 70 (mobile)", "1-9 (landline)"],
      country: "Hungary",
    },
  };
};

