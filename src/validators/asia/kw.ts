import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Kuwaiti phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 5, 6, or 9
 * - Landline: 8 digits starting with 2
 * - Handles international format (+965 prefix) and 00965 prefix
 *
 * Mobile carriers:
 * - 5xxx xxxx: Zain
 * - 6xxx xxxx: Ooredoo
 * - 9xxx xxxx: Viva
 *
 * @example
 * validateKW("5123 4567") // { isValid: true }
 * validateKW("4123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateKW: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00965") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("965") && digits.length >= 11) {
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

  // Mobile: starts with 5, 6, or 9
  if (/^[569]/.test(digits)) {
    if (!/^[569]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Kuwait",
          type: "mobile",
        }),
        details: { country: "Kuwait", type: "mobile" },
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
          country: "Kuwait",
          type: "landline",
        }),
        details: { country: "Kuwait", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["5, 6, 9 (mobile)", "2 (landline)"],
      country: "Kuwait",
    }),
    details: {
      validPrefixes: ["5, 6, 9 (mobile)", "2 (landline)"],
      country: "Kuwait",
    },
  };
};
