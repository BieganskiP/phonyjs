import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Ugandan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 07xx
 * - Landline: 10 digits with area codes (e.g., 041-Kampala, 0392-Entebbe)
 * - Handles international format (+256 prefix) and 00256 prefix
 *
 * Mobile prefixes: 070-079
 * Major area codes:
 * - 041: Kampala
 * - 0392: Entebbe
 * - 0485: Jinja
 *
 * @example
 * validateUG("0712 345 678") // { isValid: true }
 * validateUG("0612 345 678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateUG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00256") && digits.length >= 12) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("256") && digits.length >= 10) {
    digits = "0" + digits.slice(3);
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
        country: "Uganda",
      }),
      details: { country: "Uganda" },
    };
  }

  // Mobile: 07xx followed by 7 digits (10 total)
  if (digits.startsWith("07")) {
    if (!/^07\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Uganda",
          type: "mobile",
        }),
        details: { country: "Uganda", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 0[2-4] followed by 8 digits (10 total)
  if (/^0[2-4]/.test(digits)) {
    if (!/^0[2-4]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Uganda",
          type: "landline",
        }),
        details: { country: "Uganda", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["07 (mobile)", "02-04 (landline)"],
      country: "Uganda",
    }),
    details: {
      validPrefixes: ["07 (mobile)", "02-04 (landline)"],
      country: "Uganda",
    },
  };
};

