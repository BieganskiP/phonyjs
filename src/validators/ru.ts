import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Russian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 7 (country code) + 9xx
 * - Landline: 11 digits with area codes (e.g., 495-Moscow, 812-St. Petersburg)
 * - Handles international format (+7 prefix) and 8 domestic prefix
 *
 * Mobile prefixes: 9xx (after country code)
 * Major area codes:
 * - 495/499: Moscow
 * - 812: St. Petersburg
 * - 383: Novosibirsk
 * - 343: Yekaterinburg
 *
 * Note: Russian numbers always include country code (7) in domestic format
 *
 * @example
 * validateRU("8 912 345 67 89") // { isValid: true }
 * validateRU("5 912 345 67 89") // { isValid: false, errorCode: "INVALID_FORMAT", ... }
 */
export const validateRU: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international format: +7 or 007
  if (digits.startsWith("007") && digits.length >= 13) {
    digits = digits.slice(3);
  } else if (digits.startsWith("7") && digits.length >= 11 && !digits.startsWith("8")) {
    // Keep as-is if starts with 7
  } else if (digits.startsWith("8") && digits.length === 11) {
    // Domestic format: 8 prefix becomes 7
    digits = "7" + digits.slice(1);
  }

  // Check length (should be 11 with country code 7, or 10 starting with 9)
  if (digits.length === 10 && digits.startsWith("9")) {
    // Valid: mobile without country code
  } else if (digits.length === 11 && digits.startsWith("7")) {
    // Valid: with country code
  } else if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  } else if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  } else {
    // Length is 10 or 11 but doesn't match the format
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Russia",
        details: "Must be 10 digits starting with 9, or 11 digits starting with 7 or 8",
      }),
      details: {
        country: "Russia",
        details: "Must be 10 digits starting with 9, or 11 digits starting with 7 or 8",
      },
    };
  }

  // Normalize to 10 digits by removing country code if present
  if (digits.startsWith("7") && digits.length === 11) {
    digits = digits.slice(1);
  }

  // After normalization, must be exactly 10 digits
  if (digits.length !== 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Russia",
      }),
      details: { country: "Russia" },
    };
  }

  // Mobile: starts with 9xx (after country code)
  if (digits.startsWith("9")) {
    if (!/^9\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Russia",
          type: "mobile",
        }),
        details: { country: "Russia", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with area codes (not 9)
  if (/^[2-8]/.test(digits)) {
    if (!/^[2-8]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Russia",
          type: "landline",
        }),
        details: { country: "Russia", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["9 (mobile)", "2-8 (landline)"],
      country: "Russia",
    }),
    details: {
      validPrefixes: ["9 (mobile)", "2-8 (landline)"],
      country: "Russia",
    },
  };
};
