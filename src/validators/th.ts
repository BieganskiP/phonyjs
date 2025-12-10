import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Thai phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 06, 08, 09
 * - Landline: 9-10 digits with area codes (e.g., 02-Bangkok, 053-Chiang Mai)
 * - Handles international format (+66 prefix) and 0066 prefix
 *
 * Mobile prefixes: 06x, 08x, 09x
 * Major area codes:
 * - 02: Bangkok
 * - 053: Chiang Mai
 * - 076: Phuket
 *
 * @example
 * validateTH("081 234 5678") // { isValid: true }
 * validateTH("051 234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateTH: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0066") && digits.length >= 10) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("66") && digits.length >= 8) {
    digits = "0" + digits.slice(2);
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
        country: "Thailand",
      }),
      details: { country: "Thailand" },
    };
  }

  // Mobile: 0[689]x followed by 7 digits (10 total)
  if (/^0[689]/.test(digits)) {
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

    if (!/^0[689]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Thailand",
          type: "mobile",
        }),
        details: { country: "Thailand", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-7] followed by 7-8 digits (9-10 total)
  if (/^0[2-7]/.test(digits)) {
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

    if (!/^0[2-7]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Thailand",
          type: "landline",
        }),
        details: { country: "Thailand", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["06, 08, 09 (mobile)", "02-07 (landline)"],
      country: "Thailand",
    }),
    details: {
      validPrefixes: ["06, 08, 09 (mobile)", "02-07 (landline)"],
      country: "Thailand",
    },
  };
};

