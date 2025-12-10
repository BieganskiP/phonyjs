import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Jordanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 7-8 digits with area codes (e.g., 6 for Amman, 2 for Irbid)
 * - Handles international format (+962 prefix) and 00962 prefix
 *
 * Mobile carriers:
 * - 7xxxx xxxx: Various carriers (Zain, Orange, Umniah)
 *
 * Major area codes:
 * - 6: Amman
 * - 2: Irbid, Jerash, Ajloun
 * - 3: Zarqa, Mafraq
 * - 5: Aqaba, Ma'an
 *
 * @example
 * validateJO("7 9123 4567") // { isValid: true }
 * validateJO("8 9123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateJO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00962") && digits.length >= 11) {
    digits = digits.slice(5);
  } else if (digits.startsWith("962") && digits.length >= 9) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Mobile: 7 followed by 8 digits (9 total)
  if (digits.startsWith("7")) {
    if (digits.length !== 9) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 9, got: digits.length, type: "mobile" }
        ),
        details: { expected: 9, got: digits.length, type: "mobile" },
      };
    }

    if (!/^7\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Jordan",
          type: "mobile",
        }),
        details: { country: "Jordan", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: area code (2-6) followed by 6-7 digits (7-8 total)
  if (/^[2-6]/.test(digits)) {
    if (digits.length < 7 || digits.length > 8) {
      return {
        isValid: false,
        errorCode:
          digits.length < 7 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 7 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "7-8", got: digits.length, type: "landline" }
        ),
        details: { expected: "7-8", got: digits.length, type: "landline" },
      };
    }

    if (!/^[2-6]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Jordan",
          type: "landline",
        }),
        details: { country: "Jordan", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7 (mobile)", "2-6 (landline)"],
      country: "Jordan",
    }),
    details: {
      validPrefixes: ["7 (mobile)", "2-6 (landline)"],
      country: "Jordan",
    },
  };
};

