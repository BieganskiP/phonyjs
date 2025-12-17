import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Egyptian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 010, 011, 012, or 015
 * - Landline: 9-10 digits with area codes (02-Cairo, 03-Alexandria, 040-Aswan, etc.)
 * - Handles international format (+20 prefix) and 0020 prefix
 *
 * Mobile carriers:
 * - Vodafone: 010
 * - Etisalat: 011
 * - Orange: 012
 * - WE (We): 015
 *
 * @example
 * validateEG("010 1234 5678") // { isValid: true }
 * validateEG("014 1234 5678") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateEG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0020") && digits.length >= 12) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("20") && digits.length >= 10) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length (9-10 digits for landlines, 11 for mobile with leading 0)
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

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Egypt",
      }),
      details: { country: "Egypt" },
    };
  }

  // Mobile: 01[0125] + 8 digits (11 total with leading 0)
  if (digits.startsWith("01")) {
    if (digits.length !== 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 11, got: digits.length, type: "mobile" }
        ),
        details: { expected: 11, got: digits.length, type: "mobile" },
      };
    }

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["010", "011", "012", "015"];

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

    if (!/^01[0125]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Egypt",
          type: "mobile",
        }),
        details: { country: "Egypt", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-9] + 7-8 digits (9-10 total)
  if (/^0[2-9]/.test(digits)) {
    if (digits.length < 9 || digits.length > 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-10", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-10", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[2-9]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Egypt",
          type: "landline",
        }),
        details: { country: "Egypt", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["010, 011, 012, 015 (mobile)", "02-09 (landline)"],
      country: "Egypt",
    }),
    details: {
      validPrefixes: ["010, 011, 012, 015 (mobile)", "02-09 (landline)"],
      country: "Egypt",
    },
  };
};

