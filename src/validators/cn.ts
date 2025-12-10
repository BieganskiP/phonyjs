import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Chinese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 13, 14, 15, 16, 17, 18, or 19
 * - Landline: 10-12 digits with area codes (010-Beijing, 021-Shanghai, etc.)
 * - Handles international format (+86 prefix) and 0086 prefix
 *
 * Mobile prefixes: 13x, 14x, 15x, 16x, 17x, 18x, 19x
 * Major area codes: 010 (Beijing), 021 (Shanghai), 020 (Guangzhou)
 *
 * @example
 * validateCN("138 0013 8000") // { isValid: true }
 * validateCN("120 0013 8000") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCN: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (+86)
  if (digits.startsWith("0086")) {
    // Mobile numbers in international format: +86 13x
    if (digits.length === 17 && /^00861[3-9]/.test(digits)) {
      digits = digits.slice(4);
    }
    // Landline in international format: +86 10 (Beijing) -> 010
    else if (digits.length >= 16) {
      digits = "0" + digits.slice(4);
    }
  } else if (digits.startsWith("86")) {
    // Mobile numbers in international format: +86 13x
    if (digits.length === 13 && /^861[3-9]/.test(digits)) {
      digits = digits.slice(2);
    }
    // Landline in international format: +86 10 (Beijing) -> 010
    else if (digits.length >= 12) {
      digits = "0" + digits.slice(2);
    }
  }

  // Check minimum length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "10-12",
        got: digits.length,
      }),
      details: { expected: "10-12", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 12) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "10-12",
        got: digits.length,
      }),
      details: { expected: "10-12", got: digits.length },
    };
  }

  // Mobile: 1[3-9] + 9 digits (11 total)
  if (digits.startsWith("1")) {
    if (digits.length !== 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 11, got: digits.length, type: "mobile" }
        ),
        details: { expected: 11, got: digits.length, type: "mobile" },
      };
    }

    if (!/^1[3-9]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "China",
          type: "mobile",
        }),
        details: { country: "China", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-9] + area code + number (10-12 digits)
  if (digits.startsWith("0")) {
    if (digits.length < 10 || digits.length > 12) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-12", got: digits.length, type: "landline" }
        ),
        details: { expected: "10-12", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[1-9]\d{8,10}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "China",
          type: "landline",
        }),
        details: { country: "China", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["13-19 (mobile)", "01-09 (landline)"],
      country: "China",
    }),
    details: {
      validPrefixes: ["13-19 (mobile)", "01-09 (landline)"],
      country: "China",
    },
  };
};
