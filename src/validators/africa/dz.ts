import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Algerian phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +213
 * - Mobile: 9 digits starting with 5, 6, 7 (e.g., 5xx, 6xx, 7xx)
 * - Landline: 9 digits with area codes (e.g., 21-Algiers, 31-Oran)
 * - Handles international format (+213 prefix) and 00213 prefix
 *
 * Mobile prefixes: 5, 6, 7
 * Major area codes:
 * - 21: Algiers
 * - 31: Oran
 * - 25: Constantine
 *
 * @example
 * validateDZ("551 23 45 67") // { isValid: true }
 * validateDZ("21 12 34 56") // { isValid: true } - Algiers
 * validateDZ("+213 551 23 45 67") // { isValid: true }
 */
export const validateDZ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00213") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("213") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 10) {
    digits = digits.slice(1);
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

  // Mobile: starts with 5, 6, 7
  if (/^[567]/.test(digits)) {
    if (!/^[567]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Algeria",
          type: "mobile",
        }),
        details: { country: "Algeria", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2-4, 9 (area codes)
  if (/^[2-49]/.test(digits)) {
    if (!/^[2-49]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Algeria",
          type: "landline",
        }),
        details: { country: "Algeria", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["5, 6, 7 (mobile)", "2-4, 9 (landline)"],
      country: "Algeria",
    }),
    details: {
      validPrefixes: ["5, 6, 7 (mobile)", "2-4, 9 (landline)"],
      country: "Algeria",
    },
  };
};

