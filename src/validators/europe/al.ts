import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Albanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Format: +355 XX YYYYYYY (8-9 digits after country code, NSN length)
 * - Domestic format: 0XX YYYYYYY (9-10 digits with leading 0)
 * - Handles international format (+355 prefix) and 00355 prefix
 *
 * Mobile prefixes: 67, 68, 69 (9 digits after country code)
 *   - International: +355 69 1234567 (9 digits: 69 + 7 digits)
 *   - Domestic: 069 1234567 (10 digits: 0 + 69 + 7 digits)
 *
 * Landline (Tirana): 4 (8 digits after country code)
 *   - International: +355 4 1234567 (8 digits: 4 + 7 digits)
 *   - Domestic: 04 1234567 (9 digits: 0 + 4 + 7 digits)
 *
 * Other landline area codes: 2-3 digits (8-9 digits after country code)
 *
 * @example
 * validateAL("069 123 4567") // { isValid: true }
 * validateAL("04 1234567") // { isValid: true }
 * validateAL("+355 69 123 4567") // { isValid: true }
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
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Albania",
      }),
      details: { country: "Albania" },
    };
  }

  // Mobile: 06[7-9] followed by 7 digits (10 total in domestic format)
  // Mobile prefixes: 67, 68, 69 (without leading 0)
  if (digits.startsWith("06")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["067", "068", "069"];

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

    // Mobile: exactly 10 digits (0 + 69 + 7 digits)
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

    if (!/^06[7-9]\d{7}$/.test(digits)) {
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
      validPrefixes: ["67-69 (mobile)", "2-5, 7-9 (landline)"],
      country: "Albania",
    }),
    details: {
      validPrefixes: ["67-69 (mobile)", "2-5, 7-9 (landline)"],
      country: "Albania",
    },
  };
};
