import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Iraqi phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 7
 * - Landline: 8-9 digits with area codes (e.g., 1 for Baghdad)
 * - Handles international format (+964 prefix) and 00964 prefix
 *
 * Mobile carriers:
 * - 7xxx xxx xxx: Various carriers (Zain, Asiacell, Korek)
 *
 * Major area codes:
 * - 1: Baghdad
 * - 30: Najaf
 * - 40: Basra
 * - 50: Erbil
 * - 60: Mosul
 *
 * @example
 * validateIQ("7812 345 678") // { isValid: true }
 * validateIQ("6812 345 678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateIQ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00964") && digits.length >= 11) {
    digits = digits.slice(5);
  } else if (digits.startsWith("964") && digits.length >= 9) {
    digits = digits.slice(3);
  }

  // Check minimum length
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  // Mobile: 7 followed by 9 digits (10 total)
  if (digits.startsWith("7")) {
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 10, got: digits.length, type: "mobile" }
        ),
        details: { expected: 10, got: digits.length, type: "mobile" },
      };
    }

    if (!/^7\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Iraq",
          type: "mobile",
        }),
        details: { country: "Iraq", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: specific area codes followed by remaining digits (8-9 total)
  if (/^[1-6]/.test(digits)) {
    if (digits.length < 8 || digits.length > 9) {
      return {
        isValid: false,
        errorCode:
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "8-9", got: digits.length, type: "landline" }
        ),
        details: { expected: "8-9", got: digits.length, type: "landline" },
      };
    }

    if (!/^[1-6]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Iraq",
          type: "landline",
        }),
        details: { country: "Iraq", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7 (mobile)", "1-6 (landline)"],
      country: "Iraq",
    }),
    details: {
      validPrefixes: ["7 (mobile)", "1-6 (landline)"],
      country: "Iraq",
    },
  };
};

