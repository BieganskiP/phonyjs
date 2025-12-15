import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Uzbekistan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9x, 88, 90-99
 * - Landline: 9 digits with area codes (e.g., 71-Tashkent, 662-Samarkand)
 * - Handles international format (+998 prefix) and 00998 prefix
 *
 * Mobile prefixes: 88, 90-99
 * Major area codes:
 * - 71: Tashkent
 * - 662: Samarkand
 * - 622: Bukhara
 *
 * @example
 * validateUZ("90 123 45 67") // { isValid: true }
 * validateUZ("80 123 45 67") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateUZ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00998") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("998") && digits.length >= 12) {
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

  // Mobile: starts with 88, 9[0-9]
  if (digits.startsWith("88") || digits.startsWith("9")) {
    if (!/^(88|9\d)\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Uzbekistan",
          type: "mobile",
        }),
        details: { country: "Uzbekistan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with [3-7]x (area codes)
  if (/^[3-7]/.test(digits)) {
    if (!/^[3-7]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Uzbekistan",
          type: "landline",
        }),
        details: { country: "Uzbekistan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["88, 90-99 (mobile)", "3-7 (landline)"],
      country: "Uzbekistan",
    }),
    details: {
      validPrefixes: ["88, 90-99 (mobile)", "3-7 (landline)"],
      country: "Uzbekistan",
    },
  };
};
