import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Swiss phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 044-Zurich, 031-Bern)
 * - Handles international format (+41 prefix) and 0041 prefix
 *
 * Mobile prefixes: 074-079
 * Major area codes:
 * - 044: Zurich
 * - 031: Bern
 * - 061: Basel
 * - 021: Lausanne
 *
 * @example
 * validateCH("079 123 45 67") // { isValid: true }
 * validateCH("070 123 45 67") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateCH: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0041") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("41") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Switzerland",
      }),
      details: { country: "Switzerland" },
    };
  }

  // Mobile: 07[4-9] followed by 7 digits (10 total)
  if (digits.startsWith("07")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["074", "075", "076", "077", "078", "079"];

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

    if (!/^07[4-9]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Switzerland",
          type: "mobile",
        }),
        details: { country: "Switzerland", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-6,8-9] followed by 8 digits (10 total)
  if (/^0[1-689]/.test(digits)) {
    if (!/^0[1-689]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Switzerland",
          type: "landline",
        }),
        details: { country: "Switzerland", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["074-079 (mobile)", "01-06, 08-09 (landline)"],
      country: "Switzerland",
    }),
    details: {
      validPrefixes: ["074-079 (mobile)", "01-06, 08-09 (landline)"],
      country: "Switzerland",
    },
  };
};
