import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Albanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 06x or 069
 * - Landline: 9 digits with area codes (e.g., 04-Tirana, 052-Durrës)
 * - Handles international format (+355 prefix) and 00355 prefix
 *
 * Mobile prefixes: 066-069
 * Major area codes:
 * - 04: Tirana
 * - 052: Durrës
 * - 042: Shkodër
 * - 082: Vlorë
 *
 * @example
 * validateAL("069 123 4567") // { isValid: true }
 * validateAL("060 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateAL: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats - Albanian numbers don't include leading 0 in international format
  // So we need to add it back
  if (digits.startsWith("00355") && digits.length >= 11) {
    const remaining = digits.slice(5);
    // If it doesn't start with 0, add it
    digits = remaining.startsWith("0") ? remaining : "0" + remaining;
  } else if (digits.startsWith("355") && digits.length >= 9) {
    const remaining = digits.slice(3);
    // If it doesn't start with 0, add it
    digits = remaining.startsWith("0") ? remaining : "0" + remaining;
  }

  // Check length (8-10 digits - mobile 9-10, landline 8-10)
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

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, { country: "Albania" }),
      details: { country: "Albania" },
    };
  }

  // Mobile: 06[6-9] followed by 6-7 digits (9-10 total)
  if (digits.startsWith("06")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["066", "067", "068", "069"];

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

    if (!/^06[6-9]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Albania",
          type: "mobile",
        }),
        details: { country: "Albania", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0 followed by [2-5,7-9] followed by 6-8 digits (8-10 total)
  if (/^0[2-57-9]/.test(digits)) {
    if (digits.length < 8 || digits.length > 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "8-10", got: digits.length, type: "landline" }
        ),
        details: { expected: "8-10", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[2-57-9]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Albania",
          type: "landline",
        }),
        details: { country: "Albania", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["66-69 (mobile)", "2-5, 7-9 (landline)"],
      country: "Albania",
    }),
    details: {
      validPrefixes: ["66-69 (mobile)", "2-5, 7-9 (landline)"],
      country: "Albania",
    },
  };
};
