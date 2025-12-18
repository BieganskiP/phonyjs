import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Turkmenistan phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +993
 * - Mobile: 8 digits starting with 6 (e.g., 61-Altyn Asyr, 62-TM-Cell, 63-MTS, 65-BCTI)
 * - Landline: 8 digits with area codes (e.g., 12-Ashgabat, 22-Türkmenabat)
 * - Handles international format (+993 prefix) and 00993 prefix
 *
 * Mobile prefixes: 6x (61, 62, 63, 64, 65, 66)
 * Major area codes:
 * - 12: Ashgabat
 * - 22: Türkmenabat
 * - 32: Dashoguz
 * - 42: Mary
 * - 52: Balkanabat
 *
 * @example
 * validateTM("61 123 456") // { isValid: true }
 * validateTM("12 345 678") // { isValid: true } - Ashgabat
 * validateTM("+993 61 123 456") // { isValid: true }
 */
export const validateTM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00993") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("993") && digits.length >= 11) {
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

  // Mobile: starts with 6
  if (digits.startsWith("6")) {
    if (!/^6[1-6]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Turkmenistan",
          type: "mobile",
        }),
        details: { country: "Turkmenistan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 1-5 (area codes)
  if (/^[1-5]/.test(digits)) {
    if (!/^[1-5]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Turkmenistan",
          type: "landline",
        }),
        details: { country: "Turkmenistan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["61-66 (mobile)", "1-5 (landline)"],
      country: "Turkmenistan",
    }),
    details: {
      validPrefixes: ["61-66 (mobile)", "1-5 (landline)"],
      country: "Turkmenistan",
    },
  };
};


