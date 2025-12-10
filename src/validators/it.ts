import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Italian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 3
 * - Landline: 9-11 digits starting with 0, followed by area code
 * - Common area codes: 02 (Milan), 06 (Rome), 055 (Florence), 081 (Naples)
 * - Handles international format (+39 prefix) and 0039 prefix
 *
 * @example
 * validateIT("320 123 4567") // { isValid: true }
 * validateIT("220 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateIT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0039") && digits.length >= 13) {
    digits = digits.slice(4);
  } else if (digits.startsWith("39") && digits.length >= 11) {
    digits = digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Mobile: 3 + 9 digits (10 total)
  if (digits.startsWith("3")) {
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 10, got: digits.length, type: "mobile" }
        ),
        details: { expected: 10, got: digits.length, type: "mobile" },
      };
    }

    if (!/^3\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Italy",
          type: "mobile",
        }),
        details: { country: "Italy", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0 + area code + number (9-11 digits total)
  if (digits.startsWith("0")) {
    if (digits.length < 9 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-11", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-11", got: digits.length, type: "landline" },
      };
    }

    if (!/^0\d{8,10}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Italy",
          type: "landline",
        }),
        details: { country: "Italy", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["3 (mobile)", "0 (landline)"],
      country: "Italy",
    }),
    details: {
      validPrefixes: ["3 (mobile)", "0 (landline)"],
      country: "Italy",
    },
  };
};
