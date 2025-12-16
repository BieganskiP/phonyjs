import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Kyrgyzstan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 5, 7
 * - Landline: 9 digits with area codes (e.g., 312-Bishkek, 3722-Osh)
 * - Handles international format (+996 prefix) and 00996 prefix
 *
 * Mobile prefixes: 5xx, 7xx
 * Major area codes:
 * - 312: Bishkek
 * - 3722: Osh
 * - 3922: Jalal-Abad
 *
 * @example
 * validateKG("555 123 456") // { isValid: true }
 * validateKG("455 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateKG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00996") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("996") && digits.length >= 12) {
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

  // Mobile: starts with 5, 7
  if (digits.startsWith("5") || digits.startsWith("7")) {
    if (!/^[57]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Kyrgyzstan",
          type: "mobile",
        }),
        details: { country: "Kyrgyzstan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 3 (area codes)
  if (digits.startsWith("3")) {
    if (!/^3\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Kyrgyzstan",
          type: "landline",
        }),
        details: { country: "Kyrgyzstan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["5, 7 (mobile)", "3 (landline)"],
      country: "Kyrgyzstan",
    }),
    details: {
      validPrefixes: ["5, 7 (mobile)", "3 (landline)"],
      country: "Kyrgyzstan",
    },
  };
};
