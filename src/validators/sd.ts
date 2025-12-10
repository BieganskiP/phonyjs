import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Sudanese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9-10 digits starting with 9x (90, 91, 92, 99, etc.)
 * - Landline: 9 digits with area codes (e.g., 15-Khartoum, 18-Omdurman)
 * - Handles international format (+249 prefix) and 00249 prefix
 *
 * Mobile carriers:
 * - 90, 91, 92: Zain
 * - 99, 98: Sudani
 * - 95, 96: MTN
 *
 * Major area codes:
 * - 15: Khartoum
 * - 18: Omdurman
 * - 41: Port Sudan
 *
 * @example
 * validateSD("091 234 5678") // { isValid: true }
 * validateSD("051 234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateSD: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00249") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("249") && digits.length >= 12) {
    digits = digits.slice(3);
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

  // Remove leading 0 if present (mobile can be with or without)
  const hasLeadingZero = digits.startsWith("0");
  if (hasLeadingZero && digits.startsWith("09")) {
    digits = digits.slice(1);
  }

  // Mobile: 9x followed by 7 digits (9 total without leading 0)
  if (digits.startsWith("9")) {
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

    if (!/^9\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Sudan",
          type: "mobile",
        }),
        details: { country: "Sudan", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 1x, 2x, etc. followed by remaining digits (9 total)
  if (/^[1-8]/.test(digits) && digits.length === 9) {
    if (!/^[1-8]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Sudan",
          type: "landline",
        }),
        details: { country: "Sudan", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["9 (mobile)", "1-8 (landline)"],
      country: "Sudan",
    }),
    details: {
      validPrefixes: ["9 (mobile)", "1-8 (landline)"],
      country: "Sudan",
    },
  };
};
