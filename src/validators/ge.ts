import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Georgian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 5xx
 * - Landline: 9 digits with area codes (e.g., 32-Tbilisi, 422-Batumi)
 * - Handles international format (+995 prefix) and 00995 prefix
 *
 * Mobile prefixes: 5xx (various operators)
 * Major area codes:
 * - 32: Tbilisi
 * - 422: Batumi
 * - 431: Kutaisi
 * - 322: Rustavi
 *
 * @example
 * validateGE("555 123 456") // { isValid: true }
 * validateGE("155 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateGE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00995") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("995") && digits.length >= 12) {
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

  // Mobile: 5xx followed by 6 digits (9 total)
  if (digits.startsWith("5")) {
    if (!/^5\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Georgia",
          type: "mobile",
        }),
        details: { country: "Georgia", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: [2-4] followed by 7-8 digits (9 total)
  if (/^[2-4]/.test(digits)) {
    if (!/^[2-4]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Georgia",
          type: "landline",
        }),
        details: { country: "Georgia", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["5 (mobile)", "2-4 (landline)"],
      country: "Georgia",
    }),
    details: {
      validPrefixes: ["5 (mobile)", "2-4 (landline)"],
      country: "Georgia",
    },
  };
};
