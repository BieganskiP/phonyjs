import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Qatari phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 3, 5, 6, or 7
 * - Landline: 8 digits starting with 4
 * - Handles international format (+974 prefix) and 00974 prefix
 *
 * Mobile carriers:
 * - 3xxx xxxx: Ooredoo
 * - 5xxx xxxx, 6xxx xxxx, 7xxx xxxx: Vodafone Qatar
 *
 * @example
 * validateQA("3123 4567") // { isValid: true }
 * validateQA("2123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateQA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00974") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("974") && digits.length >= 11) {
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

  // Mobile: starts with 3, 5, 6, or 7
  if (/^[3567]/.test(digits)) {
    if (!/^[3567]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Qatar",
          type: "mobile",
        }),
        details: { country: "Qatar", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 4
  if (digits.startsWith("4")) {
    if (!/^4\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Qatar",
          type: "landline",
        }),
        details: { country: "Qatar", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["3, 5, 6, 7 (mobile)", "4 (landline)"],
      country: "Qatar",
    }),
    details: {
      validPrefixes: ["3, 5, 6, 7 (mobile)", "4 (landline)"],
      country: "Qatar",
    },
  };
};
