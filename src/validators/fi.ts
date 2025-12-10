import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Finnish phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 04x
 * - Landline: 9-11 digits with area codes (e.g., 09-Helsinki, 03-Tampere)
 * - Handles international format (+358 prefix) and 00358 prefix
 *
 * Mobile prefixes: 040-050
 * Major area codes:
 * - 09: Helsinki
 * - 03: Tampere
 * - 06: Lahti
 * - 02: Turku
 *
 * @example
 * validateFI("040 123 4567") // { isValid: true }
 * validateFI("030 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateFI: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00358") && digits.length >= 11) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("358") && digits.length >= 9) {
    digits = "0" + digits.slice(3);
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
        country: "Finland",
      }),
      details: { country: "Finland" },
    };
  }

  // Mobile: 04[0-5] followed by 7 digits (10 total)
  if (digits.startsWith("04")) {
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
    const validMobilePrefixes = ["040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050"];

    if (!validMobilePrefixes.includes(mobilePrefix)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: ["040-050"],
          got: mobilePrefix,
        }),
        details: { validPrefixes: ["040-050"], got: mobilePrefix },
      };
    }

    if (!/^04[0-5]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Finland",
          type: "mobile",
        }),
        details: { country: "Finland", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-3,5,7-9] followed by 6-9 digits (8-11 total)
  if (/^0[12357-9]/.test(digits)) {
    if (digits.length < 8 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "8-11", got: digits.length, type: "landline" }
        ),
        details: { expected: "8-11", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[12357-9]\d{6,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Finland",
          type: "landline",
        }),
        details: { country: "Finland", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["040-050 (mobile)", "01-03, 05, 07-09 (landline)"],
      country: "Finland",
    }),
    details: {
      validPrefixes: ["040-050 (mobile)", "01-03, 05, 07-09 (landline)"],
      country: "Finland",
    },
  };
};

