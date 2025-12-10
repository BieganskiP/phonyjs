import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Afghanistan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 9 digits with area codes (e.g., 20-Kabul, 40-Herat)
 * - Handles international format (+93 prefix) and 0093 prefix
 *
 * Mobile prefixes: 70-79
 * Major area codes:
 * - 20: Kabul
 * - 40: Herat
 * - 30: Kandahar
 *
 * @example
 * validateAF("70 123 4567") // { isValid: true }
 * validateAF("80 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateAF: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0093") && digits.length >= 13) {
    digits = digits.slice(4);
  } else if (digits.startsWith("93") && digits.length >= 11) {
    digits = digits.slice(2);
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

  // Mobile: starts with 7
  if (digits.startsWith("7")) {
    if (!/^7\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Afghanistan",
          type: "mobile",
        }),
        details: { country: "Afghanistan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2-6 (area codes)
  if (/^[2-6]/.test(digits)) {
    if (!/^[2-6]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Afghanistan",
          type: "landline",
        }),
        details: { country: "Afghanistan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7 (mobile)", "2-6 (landline area codes)"],
      country: "Afghanistan",
    }),
    details: {
      validPrefixes: ["7 (mobile)", "2-6 (landline area codes)"],
      country: "Afghanistan",
    },
  };
};
