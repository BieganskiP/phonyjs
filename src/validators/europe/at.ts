import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Austrian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11-13 digits starting with 06xx
 * - Landline: 10-13 digits with area codes (e.g., 01-Vienna, 0316-Graz)
 * - Handles international format (+43 prefix) and 0043 prefix
 *
 * Mobile prefixes: 0650-0699, 0660-0699
 * Major area codes:
 * - 01: Vienna
 * - 0316: Graz
 * - 0512: Innsbruck
 * - 0662: Salzburg
 *
 * @example
 * validateAT("0650 123 4567") // { isValid: true }
 * validateAT("0750 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateAT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0043") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("43") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-13",
        got: digits.length,
      }),
      details: { expected: "9-13", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 13) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-13",
        got: digits.length,
      }),
      details: { expected: "9-13", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Austria",
      }),
      details: { country: "Austria" },
    };
  }

  // Mobile: 06[0-9]x followed by 7-9 digits (11-13 total)
  if (digits.startsWith("06")) {
    if (digits.length < 11 || digits.length > 13) {
      return {
        isValid: false,
        errorCode:
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "11-13", got: digits.length, type: "mobile" }
        ),
        details: { expected: "11-13", got: digits.length, type: "mobile" },
      };
    }

    if (!/^06[0-9]\d{8,10}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Austria",
          type: "mobile",
        }),
        details: { country: "Austria", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-59] followed by varying digits (9-13 total)
  if (/^0[1-59]/.test(digits)) {
    if (digits.length < 9 || digits.length > 13) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-13", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-13", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[1-59]\d{7,11}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Austria",
          type: "landline",
        }),
        details: { country: "Austria", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["06 (mobile)", "01-05, 09 (landline)"],
      country: "Austria",
    }),
    details: {
      validPrefixes: ["06 (mobile)", "01-05, 09 (landline)"],
      country: "Austria",
    },
  };
};
