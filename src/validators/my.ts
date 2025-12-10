import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Malaysian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10-11 digits starting with 01x
 * - Landline: 9-10 digits with area codes (e.g., 03-Kuala Lumpur, 04-Penang)
 * - Handles international format (+60 prefix) and 0060 prefix
 *
 * Mobile prefixes: 010-019
 * Major area codes:
 * - 03: Kuala Lumpur/Selangor
 * - 04: Penang
 * - 07: Johor
 *
 * @example
 * validateMY("012 345 6789") // { isValid: true }
 * validateMY("002 345 6789") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateMY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0060") && digits.length >= 10) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("60") && digits.length >= 8) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
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
        country: "Malaysia",
      }),
      details: { country: "Malaysia" },
    };
  }

  // Mobile: 01[0-9] followed by 7-8 digits (10-11 total)
  if (digits.startsWith("01")) {
    if (digits.length < 10 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-11", got: digits.length, type: "mobile" }
        ),
        details: { expected: "10-11", got: digits.length, type: "mobile" },
      };
    }

    if (!/^01\d{8,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Malaysia",
          type: "mobile",
        }),
        details: { country: "Malaysia", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-9] (not 01) followed by 7-8 digits (9-10 total)
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

    if (!/^0[2-9]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Malaysia",
          type: "landline",
        }),
        details: { country: "Malaysia", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["01 (mobile)", "02-09 (landline)"],
      country: "Malaysia",
    }),
    details: {
      validPrefixes: ["01 (mobile)", "02-09 (landline)"],
      country: "Malaysia",
    },
  };
};

