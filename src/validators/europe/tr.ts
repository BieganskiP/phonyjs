import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Turkish phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 5xx (50x-59x)
 * - Landline: 11 digits with area codes (e.g., 212-Istanbul, 312-Ankara, 216-Istanbul Asian)
 * - Handles international format (+90 prefix) and 0090 prefix
 *
 * Mobile prefixes: 50x, 51x, 52x, 53x, 54x, 55x, 56x, 57x, 58x, 59x
 * Major area codes: 212 (Istanbul European), 216 (Istanbul Asian), 312 (Ankara), 232 (Izmir)
 *
 * @example
 * validateTR("0532 123 4567") // { isValid: true }
 * validateTR("0432 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateTR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0090") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("90") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check length
  if (digits.length < 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 11,
        got: digits.length,
      }),
      details: { expected: 11, got: digits.length },
    };
  }

  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 11,
        got: digits.length,
      }),
      details: { expected: 11, got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Turkey",
      }),
      details: { country: "Turkey" },
    };
  }

  // Mobile: 05xx followed by 8 digits (11 total with leading 0)
  if (digits.startsWith("05")) {
    if (!/^05\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Turkey",
          type: "mobile",
        }),
        details: { country: "Turkey", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 0[2-4]xx followed by 7 digits (11 total)
  if (/^0[2-4]/.test(digits)) {
    if (!/^0[2-4]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Turkey",
          type: "landline",
        }),
        details: { country: "Turkey", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["05 (mobile)", "02-04 (landline)"],
      country: "Turkey",
    }),
    details: {
      validPrefixes: ["05 (mobile)", "02-04 (landline)"],
      country: "Turkey",
    },
  };
};
