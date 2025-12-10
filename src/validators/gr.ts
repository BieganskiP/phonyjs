import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Greek phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 69 (69x)
 * - Landline: 10 digits starting with 2 (area codes like 21-Athens, 231-Thessaloniki)
 * - Handles international format (+30 prefix) and 0030 prefix
 *
 * Mobile prefixes: 690-699 (various carriers - Cosmote, Vodafone, Wind)
 * Major area codes:
 * - 21: Athens and Attica
 * - 231: Thessaloniki
 * - 261: Patras
 * - 281: Heraklion
 *
 * @example
 * validateGR("698 123 4567") // { isValid: true }
 * validateGR("688 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateGR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0030") && digits.length >= 14) {
    digits = digits.slice(4);
  } else if (digits.startsWith("30") && digits.length >= 12) {
    digits = digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Mobile: 69x followed by 7 digits (10 total)
  if (digits.startsWith("69")) {
    if (!/^69\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Greece",
          type: "mobile",
        }),
        details: { country: "Greece", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 2x followed by 8 digits (10 total)
  if (digits.startsWith("2")) {
    if (!/^2\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Greece",
          type: "landline",
        }),
        details: { country: "Greece", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["69 (mobile)", "2 (landline)"],
      country: "Greece",
    }),
    details: {
      validPrefixes: ["69 (mobile)", "2 (landline)"],
      country: "Greece",
    },
  };
};
