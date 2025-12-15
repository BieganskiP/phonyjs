import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bahraini phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 3
 * - Landline: 8 digits starting with 1 or 7
 * - Handles international format (+973 prefix) and 00973 prefix
 *
 * Mobile carriers:
 * - 3xxx xxxx: Various carriers (Batelco, Zain, Viva)
 *
 * Landline:
 * - 1xxx xxxx: Manama and central regions
 * - 7xxx xxxx: Other regions
 *
 * @example
 * validateBH("3123 4567") // { isValid: true }
 * validateBH("5123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateBH: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00973") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("973") && digits.length >= 11) {
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

  // Mobile: starts with 3
  if (digits.startsWith("3")) {
    if (!/^3\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Bahrain",
          type: "mobile",
        }),
        details: { country: "Bahrain", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 1 or 7
  if (digits.startsWith("1") || digits.startsWith("7")) {
    if (!/^[17]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Bahrain",
          type: "landline",
        }),
        details: { country: "Bahrain", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["3 (mobile)", "1, 7 (landline)"],
      country: "Bahrain",
    }),
    details: {
      validPrefixes: ["3 (mobile)", "1, 7 (landline)"],
      country: "Bahrain",
    },
  };
};
