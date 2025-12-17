import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Tunisian phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +216
 * - Mobile: 8 digits starting with 2, 4, 5, 9 (e.g., 2x, 4x, 5x, 9x)
 * - Landline: 8 digits starting with 7 (e.g., 71-Tunis, 72-Zaghouan)
 * - Handles international format (+216 prefix) and 00216 prefix
 *
 * Mobile prefixes: 2, 4, 5, 9
 * Landline prefix: 7
 * Major area codes:
 * - 71: Tunis
 * - 73: Sousse
 * - 74: Sfax
 *
 * @example
 * validateTN("20 123 456") // { isValid: true }
 * validateTN("71 123 456") // { isValid: true } - Tunis
 * validateTN("+216 20 123 456") // { isValid: true }
 */
export const validateTN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00216") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("216") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  // Mobile: starts with 2, 4, 5, 9
  if (/^[2459]/.test(digits)) {
    if (!/^[2459]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Tunisia",
          type: "mobile",
        }),
        details: { country: "Tunisia", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 7
  if (digits.startsWith("7")) {
    if (!/^7\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Tunisia",
          type: "landline",
        }),
        details: { country: "Tunisia", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["2, 4, 5, 9 (mobile)", "7 (landline)"],
      country: "Tunisia",
    }),
    details: {
      validPrefixes: ["2, 4, 5, 9 (mobile)", "7 (landline)"],
      country: "Tunisia",
    },
  };
};

