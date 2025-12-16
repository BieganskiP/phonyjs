import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bangladeshi phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 01XX (01XX-XXXXXXX)
 * - Landline: 10-11 digits with area codes (0XX XXX XXXX or 0XXX XX XXXX)
 * - Mobile prefixes: 013, 014, 015, 016, 017, 018, 019
 * - Handles international format (+880 prefix) and 00880 prefix
 *
 * @example
 * validateBD("01712 345678") // { isValid: true }
 * validateBD("02 1234 5678") // { isValid: true }
 */
export const validateBD: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00880")) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("880")) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Bangladesh",
      }),
      details: { country: "Bangladesh" },
    };
  }

  // Mobile: 01XX-XXXXXXX (11 digits total)
  if (digits.startsWith("01")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["013", "014", "015", "016", "017", "018", "019"];

    if (validMobilePrefixes.includes(mobilePrefix)) {
      if (digits.length === 11) {
        return { isValid: true };
      }
      return {
        isValid: false,
        errorCode: digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          {
            expected: 11,
            got: digits.length,
            type: "mobile",
          }
        ),
        details: { expected: 11, got: digits.length, type: "mobile" },
      };
    }

    if (digits.length === 11) {
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

    return {
      isValid: false,
      errorCode: digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 11,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 11, got: digits.length, type: "mobile" },
    };
  }

  // Landline: 0XX XXX XXXX or 0XXX XX XXXX (10-11 digits total)
  if (digits.length >= 10 && digits.length <= 11) {
    // Area codes: 2-digit (Dhaka 02) or 3-digit
    if (/^0[2-9]\d{8,9}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Bangladesh",
    }),
    details: { country: "Bangladesh" },
  };
};

