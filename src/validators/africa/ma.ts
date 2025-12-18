import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Moroccan phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +212
 * - Mobile: 9 digits starting with 6 or 7 (e.g., 6xx, 7xx)
 * - Landline: 9 digits starting with 5 followed by area code
 * - Handles international format (+212 prefix) and 00212 prefix
 *
 * Mobile prefixes: 6, 7
 * Landline format: 5 + area code (e.g., 520-Casablanca, 537-Rabat)
 *
 * @example
 * validateMA("612 34 56 78") // { isValid: true }
 * validateMA("520 12 34 56") // { isValid: true } - Casablanca
 * validateMA("+212 612 34 56 78") // { isValid: true }
 */
export const validateMA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00212") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("212") && digits.length >= 12) {
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

  // Mobile: starts with 6 or 7
  if (/^[67]/.test(digits)) {
    if (!/^[67]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Morocco",
          type: "mobile",
        }),
        details: { country: "Morocco", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 5
  if (digits.startsWith("5")) {
    if (!/^5\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Morocco",
          type: "landline",
        }),
        details: { country: "Morocco", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["6, 7 (mobile)", "5 (landline)"],
      country: "Morocco",
    }),
    details: {
      validPrefixes: ["6, 7 (mobile)", "5 (landline)"],
      country: "Morocco",
    },
  };
};



