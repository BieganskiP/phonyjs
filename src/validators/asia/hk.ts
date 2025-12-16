import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Hong Kong phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 4, 5, 6, 7, 9
 * - Landline: 8 digits starting with 2, 3
 * - Handles international format (+852 prefix) and 00852 prefix
 *
 * Mobile prefixes: 4xxx-9xxx
 * Landline prefixes: 2xxx, 3xxx
 *
 * Note: Hong Kong does not use area codes, all numbers are 8 digits
 *
 * @example
 * validateHK("9123 4567") // { isValid: true }
 * validateHK("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateHK: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00852") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("852") && digits.length >= 11) {
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

  // Mobile: starts with 4, 5, 6, 7, 9
  if (/^[4-79]/.test(digits)) {
    if (!/^[4-79]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Hong Kong",
          type: "mobile",
        }),
        details: { country: "Hong Kong", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2, 3
  if (/^[23]/.test(digits)) {
    if (!/^[23]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Hong Kong",
          type: "landline",
        }),
        details: { country: "Hong Kong", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["4-7, 9 (mobile)", "2, 3 (landline)"],
      country: "Hong Kong",
    }),
    details: {
      validPrefixes: ["4-7, 9 (mobile)", "2, 3 (landline)"],
      country: "Hong Kong",
    },
  };
};
