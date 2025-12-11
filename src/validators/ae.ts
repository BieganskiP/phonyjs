import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates UAE (United Arab Emirates) phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 050, 052, 054, 055, 056, or 058 (0 + mobile prefix + 7-digit local number)
 * - Landline: 9 digits with area codes (02-Abu Dhabi, 03-Al Ain, 04-Dubai, 06-Sharjah/Ajman/UAQ, 07-Ras Al Khaimah, 09-Fujairah)
 * - Handles international format (+971 prefix) and 00971 prefix
 *
 * Mobile carriers:
 * - Etisalat: 050, 052, 056
 * - du: 054, 055, 058
 *
 * @example
 * validateAE("050 123 4567") // { isValid: true }
 * validateAE("04 123 4567") // { isValid: true }
 * validateAE("057 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateAE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00971") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("971") && digits.length >= 11) {
    digits = "0" + digits.slice(3);
  }

  // Check length (9-10 digits)
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
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, { country: "UAE" }),
      details: { country: "UAE" },
    };
  }

  // Mobile: 05[024568] + 7 digits (10 total)
  if (digits.startsWith("05")) {
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

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["050", "052", "054", "055", "056", "058"];

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

    if (!/^05[024568]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "UAE",
          type: "mobile",
        }),
        details: { country: "UAE", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-4679] + 7 digits (9 total)
  if (/^0[2-4679]/.test(digits)) {
    if (digits.length !== 9) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 9, got: digits.length, type: "landline" }
        ),
        details: { expected: 9, got: digits.length, type: "landline" },
      };
    }

    if (!/^0[2-4679]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "UAE",
          type: "landline",
        }),
        details: { country: "UAE", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: [
        "05 (mobile)",
        "02 (Abu Dhabi)",
        "03 (Al Ain)",
        "04 (Dubai)",
        "06 (Sharjah)",
        "07 (RAK)",
        "09 (other)",
      ],
      country: "UAE",
    }),
    details: {
      validPrefixes: [
        "05 (mobile)",
        "02 (Abu Dhabi)",
        "03 (Al Ain)",
        "04 (Dubai)",
        "06 (Sharjah)",
        "07 (RAK)",
        "09 (other)",
      ],
      country: "UAE",
    },
  };
};
