import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Bosnia and Herzegovina phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6x
 * - Landline: 8-9 digits with area codes (e.g., 33-Sarajevo, 51-Banja Luka)
 * - Handles international format (+387 prefix) and 00387 prefix
 *
 * Mobile prefixes: 60-66
 * Major area codes:
 * - 33: Sarajevo
 * - 51: Banja Luka
 * - 35: Mostar
 * - 32: Tuzla
 *
 * @example
 * validateBA("061 123 456") // { isValid: true }
 * validateBA("067 123 456") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateBA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00387") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("387") && digits.length >= 11) {
    digits = "0" + digits.slice(3);
  }

  // Check minimum length (9 digits with leading 0 for mobile, 8-9 for landline)
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8-9",
        got: digits.length,
      }),
      details: { expected: "8-9", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8-9",
        got: digits.length,
      }),
      details: { expected: "8-9", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, { country: "Bosnia and Herzegovina" }),
      details: { country: "Bosnia and Herzegovina" },
    };
  }

  // Mobile: 06[0-6] followed by 6 digits (9 total with leading 0)
  if (digits.startsWith("06")) {
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

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["060", "061", "062", "063", "064", "065", "066"];

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

    if (!/^06[0-6]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Bosnia and Herzegovina",
          type: "mobile",
        }),
        details: { country: "Bosnia and Herzegovina", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[3-5] followed by 6-7 digits (8-9 total)
  if (/^0[3-5]/.test(digits)) {
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

    if (!/^0[3-5]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Bosnia and Herzegovina",
          type: "landline",
        }),
        details: { country: "Bosnia and Herzegovina", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["060-066 (mobile)", "03-05 (landline)"],
      country: "Bosnia and Herzegovina",
    }),
    details: {
      validPrefixes: ["060-066 (mobile)", "03-05 (landline)"],
      country: "Bosnia and Herzegovina",
    },
  };
};
