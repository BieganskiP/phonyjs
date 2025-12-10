import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Japanese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 070, 080, or 090
 * - Landline: 10 digits with area codes (03-Tokyo, 06-Osaka, 045-Yokohama, etc.)
 * - Handles international format (+81 prefix) and 0081 prefix
 *
 * Mobile prefixes:
 * - 070: Mobile (newer allocations)
 * - 080: Mobile
 * - 090: Mobile
 *
 * @example
 * validateJP("090 1234 5678") // { isValid: true }
 * validateJP("050 1234 5678") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateJP: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (+81)
  // For landlines, international format drops the leading 0
  if (digits.startsWith("0081")) {
    if (digits.length === 16 && /^0081[789]0/.test(digits)) {
      // Mobile: +81 90 -> 090
      digits = "0" + digits.slice(4);
    } else if (digits.length >= 15) {
      // Landline: +81 3 -> 03
      digits = "0" + digits.slice(4);
    }
  } else if (digits.startsWith("81")) {
    if (digits.length === 12 && /^81[789]0/.test(digits)) {
      // Mobile: +81 90 -> 090
      digits = "0" + digits.slice(2);
    } else if (digits.length >= 11) {
      // Landline: +81 3 -> 03
      digits = "0" + digits.slice(2);
    }
  }

  // Check minimum length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Japan",
      }),
      details: { country: "Japan" },
    };
  }

  // Mobile: 0[789]0 + 8 digits (11 total)
  if (/^0[789]0/.test(digits)) {
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

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["070", "080", "090"];

    if (!validMobilePrefixes.includes(mobilePrefix)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: validMobilePrefixes,
          got: mobilePrefix,
        }),
        details: { validPrefixes: validMobilePrefixes, got: mobilePrefix },
      };
    }

    if (!/^0[789]0\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Japan",
          type: "mobile",
        }),
        details: { country: "Japan", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-9] + 8-9 digits (10 total, or 9 for some areas)
  if (/^0[1-9]/.test(digits)) {
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 10, got: digits.length, type: "landline" }
        ),
        details: { expected: 10, got: digits.length, type: "landline" },
      };
    }

    if (!/^0[1-9]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Japan",
          type: "landline",
        }),
        details: { country: "Japan", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["070, 080, 090 (mobile)", "01-09 (landline)"],
      country: "Japan",
    }),
    details: {
      validPrefixes: ["070, 080, 090 (mobile)", "01-09 (landline)"],
      country: "Japan",
    },
  };
};
