import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Central African Republic phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +236
 * - Format: 8 digits
 * - Mobile: starts with 7
 * - Landline: starts with 2
 * - Handles international format (+236 prefix) and 00236 prefix
 *
 * @example
 * validateCF("70 12 34 56") // { isValid: true }
 * validateCF("21 12 34 56") // { isValid: true }
 * validateCF("+236 70 12 34 56") // { isValid: true }
 */
export const validateCF: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00236") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("236") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (!/^[27]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "7 (mobile)"],
        country: "Central African Republic",
      }),
      details: {
        validPrefixes: ["2 (landline)", "7 (mobile)"],
        country: "Central African Republic",
      },
    };
  }

  return { isValid: true };
};



