import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates UK phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: Start with 07, followed by 1-9 (not 0), 11 digits total
 * - Landline: Start with 01, 02, or 03, 10-11 digits total
 * - 070 is NOT standard mobile (personal numbers)
 * - Handles international format (+44 prefix) and 0044 prefix
 *
 * @example
 * validateGB("07123 456789") // { isValid: true }
 * validateGB("070") // { isValid: false, errorCode: "PERSONAL_NUMBER_PREFIX", ... }
 */
export const validateGB: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0044") && digits.length >= 14) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("44") && digits.length >= 12) {
    digits = "0" + digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, { country: "UK" }),
      details: { country: "UK" },
    };
  }

  // Check for 070 (personal numbers)
  if (digits.startsWith("070")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.PERSONAL_NUMBER_PREFIX,
      message: getMessage(ErrorCodes.PERSONAL_NUMBER_PREFIX, { prefix: "070" }),
      details: { prefix: "070" },
    };
  }

  // Mobile: 07[1-9] + 8 digits
  if (digits.startsWith("07")) {
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
    if (!/^07[1-9]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "UK",
          type: "mobile",
        }),
        details: { country: "UK", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 01/02/03
  if (
    digits.startsWith("01") ||
    digits.startsWith("02") ||
    digits.startsWith("03")
  ) {
    if (digits.length < 10 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-11", got: digits.length, type: "landline" }
        ),
        details: { expected: "10-11", got: digits.length, type: "landline" },
      };
    }
    if (!/^0[123]\d{8,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "UK",
          type: "landline",
        }),
        details: { country: "UK", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["01", "02", "03", "07"],
      country: "UK",
    }),
    details: { validPrefixes: ["01", "02", "03", "07"], country: "UK" },
  };
};
