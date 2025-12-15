import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Montenegro phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6x
 * - Landline: 7-8 digits with area codes (e.g., 20-Podgorica, 30-Nikšić)
 * - Handles international format (+382 prefix) and 00382 prefix
 *
 * Mobile prefixes: 61-69
 * Major area codes:
 * - 20: Podgorica
 * - 30: Nikšić
 * - 32: Herceg Novi
 * - 33: Budva
 *
 * @example
 * validateME("067 123 456") // { isValid: true }
 * validateME("057 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateME: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00382") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("382") && digits.length >= 11) {
    digits = "0" + digits.slice(3);
  }

  // Remove leading 0 if present (Montenegro numbers can be with or without)
  const hasLeadingZero = digits.startsWith("0");
  if (hasLeadingZero) {
    digits = digits.slice(1);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  // Mobile: 6[0-9] followed by 6 digits (8 total)
  if (digits.startsWith("6")) {
    if (digits.length !== 8) {
      return {
        isValid: false,
        errorCode:
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 8, got: digits.length, type: "mobile" }
        ),
        details: { expected: 8, got: digits.length, type: "mobile" },
      };
    }

    if (!/^6\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Montenegro",
          type: "mobile",
        }),
        details: { country: "Montenegro", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: [2-5] followed by 6 digits (7-8 total)
  if (/^[2-5]/.test(digits)) {
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

    if (!/^[2-5]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Montenegro",
          type: "landline",
        }),
        details: { country: "Montenegro", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["6 (mobile)", "2-5 (landline)"],
      country: "Montenegro",
    }),
    details: {
      validPrefixes: ["6 (mobile)", "2-5 (landline)"],
      country: "Montenegro",
    },
  };
};
