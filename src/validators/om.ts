import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Omani phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 7, 9
 * - Landline: 8 digits starting with 2 (area codes like 24-Muscat)
 * - Handles international format (+968 prefix) and 00968 prefix
 *
 * Mobile carriers:
 * - 7xxx xxxx: Omantel
 * - 9xxx xxxx: Ooredoo
 *
 * Major area codes:
 * - 24: Muscat
 * - 25: Sohar
 * - 26: Nizwa
 * - 23: Salalah
 *
 * @example
 * validateOM("7123 4567") // { isValid: true }
 * validateOM("5123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateOM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00968") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("968") && digits.length >= 11) {
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

  // Mobile: starts with 7 or 9
  if (/^[79]/.test(digits)) {
    if (!/^[79]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Oman",
          type: "mobile",
        }),
        details: { country: "Oman", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2
  if (digits.startsWith("2")) {
    if (!/^2\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Oman",
          type: "landline",
        }),
        details: { country: "Oman", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7, 9 (mobile)", "2 (landline)"],
      country: "Oman",
    }),
    details: {
      validPrefixes: ["7, 9 (mobile)", "2 (landline)"],
      country: "Oman",
    },
  };
};
