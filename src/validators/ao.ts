import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Angolan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9x
 * - Landline: 9 digits starting with 2x
 * - Handles international format (+244 prefix) and 00244 prefix
 *
 * Mobile prefixes: 91-94
 * Landline prefixes: 22 (Luanda), 23x (other regions)
 *
 * @example
 * validateAO("923 123 456") // { isValid: true }
 * validateAO("823 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateAO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00244") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("244") && digits.length >= 12) {
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

  // Mobile: 9 followed by 8 digits (9 total)
  if (digits.startsWith("9")) {
    if (!/^9\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Angola",
          type: "mobile",
        }),
        details: { country: "Angola", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 2 followed by 8 digits (9 total)
  if (digits.startsWith("2")) {
    if (!/^2\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Angola",
          type: "landline",
        }),
        details: { country: "Angola", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["9 (mobile)", "2 (landline)"],
      country: "Angola",
    }),
    details: {
      validPrefixes: ["9 (mobile)", "2 (landline)"],
      country: "Angola",
    },
  };
};
