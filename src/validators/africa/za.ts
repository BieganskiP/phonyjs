import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates South African phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 06x, 07x, 08x
 * - Landline: 10 digits with area codes (e.g., 011-Johannesburg, 021-Cape Town)
 * - Handles international format (+27 prefix) and 0027 prefix
 *
 * Mobile prefixes: 06x-08x
 * Major area codes:
 * - 011: Johannesburg
 * - 021: Cape Town
 * - 031: Durban
 * - 012: Pretoria
 *
 * @example
 * validateZA("072 123 4567") // { isValid: true }
 * validateZA("052 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateZA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0027") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("27") && digits.length >= 9) {
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
        country: "South Africa",
      }),
      details: { country: "South Africa" },
    };
  }

  // Mobile: 0[6-8]x followed by 7 digits (10 total)
  if (/^0[6-8]/.test(digits)) {
    if (!/^0[6-8]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "South Africa",
          type: "mobile",
        }),
        details: { country: "South Africa", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 0[1-5] followed by 8 digits (10 total)
  if (/^0[1-5]/.test(digits)) {
    if (!/^0[1-5]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "South Africa",
          type: "landline",
        }),
        details: { country: "South Africa", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["06-08 (mobile)", "01-05 (landline)"],
      country: "South Africa",
    }),
    details: {
      validPrefixes: ["06-08 (mobile)", "01-05 (landline)"],
      country: "South Africa",
    },
  };
};

