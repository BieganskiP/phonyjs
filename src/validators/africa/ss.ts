import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates South Sudan phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +211
 * - Format: 9 digits
 * - Mobile: starts with 9
 * - Landline: starts with 1
 * - Handles international format (+211 prefix) and 00211 prefix
 *
 * @example
 * validateSS("92 123 4567") // { isValid: true }
 * validateSS("18 123 4567") // { isValid: true }
 * validateSS("+211 92 123 4567") // { isValid: true }
 */
export const validateSS: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00211") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("211") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 10) {
    digits = digits.slice(1);
  }

  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (!/^[19]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["1 (landline)", "9 (mobile)"],
        country: "South Sudan",
      }),
      details: {
        validPrefixes: ["1 (landline)", "9 (mobile)"],
        country: "South Sudan",
      },
    };
  }

  return { isValid: true };
};



