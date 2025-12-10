import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Sri Lankan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 011-Colombo, 081-Kandy)
 * - Handles international format (+94 prefix) and 0094 prefix
 *
 * Mobile prefixes: 070-079
 * Major area codes:
 * - 011: Colombo
 * - 081: Kandy
 * - 091: Jaffna
 *
 * @example
 * validateLK("071 234 5678") // { isValid: true }
 * validateLK("061 234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateLK: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0094") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("94") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
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

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Sri Lanka",
      }),
      details: { country: "Sri Lanka" },
    };
  }

  // Mobile: 07[0-9] followed by 7 digits (10 total)
  if (digits.startsWith("07")) {
    if (!/^07\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Sri Lanka",
          type: "mobile",
        }),
        details: { country: "Sri Lanka", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 0[1-6,8-9] (not 07) followed by 8 digits (10 total)
  if (/^0[1-689]/.test(digits)) {
    if (!/^0[1-689]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Sri Lanka",
          type: "landline",
        }),
        details: { country: "Sri Lanka", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["07 (mobile)", "01-06, 08-09 (landline)"],
      country: "Sri Lanka",
    }),
    details: {
      validPrefixes: ["07 (mobile)", "01-06, 08-09 (landline)"],
      country: "Sri Lanka",
    },
  };
};

