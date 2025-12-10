import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Belgian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9-10 digits starting with 04xx
 * - Landline: 9-10 digits with area codes (e.g., 02-Brussels, 03-Antwerp)
 * - Handles international format (+32 prefix) and 0032 prefix
 *
 * Mobile prefixes: 046-049
 * Major area codes:
 * - 02: Brussels
 * - 03: Antwerp
 * - 04: Liège
 * - 09: Ghent
 *
 * @example
 * validateBE("0470 12 34 56") // { isValid: true }
 * validateBE("0440 12 34 56") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateBE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0032") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("32") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Belgium",
      }),
      details: { country: "Belgium" },
    };
  }

  // Mobile: 04[5-9] followed by 7 digits (10 total)
  if (digits.startsWith("04")) {
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

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["045", "046", "047", "048", "049"];

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

    if (!/^04[5-9]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Belgium",
          type: "mobile",
        }),
        details: { country: "Belgium", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-3,9] followed by 7-8 digits (9-10 total)
  if (/^0[1-39]/.test(digits)) {
    if (digits.length < 9 || digits.length > 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-10", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-10", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[1-39]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Belgium",
          type: "landline",
        }),
        details: { country: "Belgium", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["045-049 (mobile)", "01-03, 09 (landline)"],
      country: "Belgium",
    }),
    details: {
      validPrefixes: ["045-049 (mobile)", "01-03, 09 (landline)"],
      country: "Belgium",
    },
  };
};
