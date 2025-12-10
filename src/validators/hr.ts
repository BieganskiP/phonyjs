import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Croatian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9x (e.g., 91, 92, 95, 97, 98, 99)
 * - Landline: 9 digits with area codes (e.g., 1-Zagreb, 21-Split, 31-Osijek)
 * - Handles international format (+385 prefix) and 00385 prefix
 *
 * Mobile prefixes: 91, 92, 95, 97, 98, 99
 * Major area codes:
 * - 1: Zagreb
 * - 21: Split
 * - 31: Osijek
 * - 51: Rijeka
 *
 * @example
 * validateHR("091 123 4567") // { isValid: true }
 * validateHR("093 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateHR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00385") && digits.length >= 11) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("385") && digits.length >= 9) {
    digits = "0" + digits.slice(3);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Croatia",
      }),
      details: { country: "Croatia" },
    };
  }

  // Mobile: 09[1-9] followed by 6-7 digits (9-10 total)
  if (digits.startsWith("09")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["091", "092", "095", "097", "098", "099"];

    if (!validMobilePrefixes.includes(mobilePrefix)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: validMobilePrefixes,
          got: mobilePrefix,
        }),
        details: { validPrefixes: validMobilePrefixes, got: mobilePrefix },
      };
    }

    if (!/^09[1-9]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Croatia",
          type: "mobile",
        }),
        details: { country: "Croatia", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-8] followed by 6-8 digits (8-10 total)
  if (/^0[1-8]/.test(digits)) {
    if (!/^0[1-8]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Croatia",
          type: "landline",
        }),
        details: { country: "Croatia", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["091, 092, 095, 097-099 (mobile)", "01-08 (landline)"],
      country: "Croatia",
    }),
    details: {
      validPrefixes: ["091, 092, 095, 097-099 (mobile)", "01-08 (landline)"],
      country: "Croatia",
    },
  };
};

