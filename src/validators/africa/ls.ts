import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Lesotho phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +266
 * - Format: 8 digits
 * - Mobile: starts with 5, 6
 * - Landline: starts with 2
 * - Handles international format (+266 prefix) and 00266 prefix
 *
 * @example
 * validateLS("5012 3456") // { isValid: true }
 * validateLS("2231 2345") // { isValid: true }
 * validateLS("+266 5012 3456") // { isValid: true }
 */
export const validateLS: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00266") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("266") && digits.length >= 11) {
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

  if (!/^[256]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "5, 6 (mobile)"],
        country: "Lesotho",
      }),
      details: {
        validPrefixes: ["2 (landline)", "5, 6 (mobile)"],
        country: "Lesotho",
      },
    };
  }

  return { isValid: true };
};


