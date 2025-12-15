import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Czech phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 6, 7
 * - Landline: 9 digits with area codes (e.g., 2-Prague region, 5-Moravia)
 * - Handles international format (+420 prefix) and 00420 prefix
 *
 * Mobile prefixes: 60x-77x
 * Major area codes:
 * - 2: Prague and Central Bohemia
 * - 3: West and South Bohemia
 * - 5: Moravia
 *
 * @example
 * validateCZ("601 123 456") // { isValid: true }
 * validateCZ("801 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCZ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00420") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("420") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  // Mobile: starts with 6 or 7
  if (digits.startsWith("6") || digits.startsWith("7")) {
    if (!/^[67]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Czech Republic",
          type: "mobile",
        }),
        details: { country: "Czech Republic", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2-5 (area codes)
  if (/^[2-5]/.test(digits)) {
    if (!/^[2-5]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Czech Republic",
          type: "landline",
        }),
        details: { country: "Czech Republic", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["6, 7 (mobile)", "2-5 (landline)"],
      country: "Czech Republic",
    }),
    details: {
      validPrefixes: ["6, 7 (mobile)", "2-5 (landline)"],
      country: "Czech Republic",
    },
  };
};
