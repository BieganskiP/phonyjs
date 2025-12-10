import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Senegalese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 7x
 * - Landline: 9 digits starting with 3x
 * - Handles international format (+221 prefix) and 00221 prefix
 *
 * Mobile prefixes: 70-79
 * Landline prefixes: 30-39
 *
 * @example
 * validateSN("77 123 45 67") // { isValid: true }
 * validateSN("67 123 45 67") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateSN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00221") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("221") && digits.length >= 12) {
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

  // Mobile: 7[0-9] followed by 7 digits (9 total)
  if (digits.startsWith("7")) {
    if (!/^7\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Senegal",
          type: "mobile",
        }),
        details: { country: "Senegal", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 3[0-9] followed by 7 digits (9 total)
  if (digits.startsWith("3")) {
    if (!/^3\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Senegal",
          type: "landline",
        }),
        details: { country: "Senegal", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7 (mobile)", "3 (landline)"],
      country: "Senegal",
    }),
    details: {
      validPrefixes: ["7 (mobile)", "3 (landline)"],
      country: "Senegal",
    },
  };
};
