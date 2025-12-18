import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Gabon phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +241
 * - Format: 8 digits (new) or 7 digits (old)
 * - Mobile: starts with 0
 * - Landline: starts with 1
 * - Handles international format (+241 prefix) and 00241 prefix
 *
 * @example
 * validateGA("07 12 34 56") // { isValid: true }
 * validateGA("1 123 456") // { isValid: true }
 * validateGA("+241 07 12 34 56") // { isValid: true }
 */
export const validateGA: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00241") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("241") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  if (!/^[01]\d{6,7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["1 (landline)", "0 (mobile)"],
        country: "Gabon",
      }),
      details: {
        validPrefixes: ["1 (landline)", "0 (mobile)"],
        country: "Gabon",
      },
    };
  }

  return { isValid: true };
};




