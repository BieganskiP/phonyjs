import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Ghana phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +233
 * - Format: 9 digits (with leading 0 removed)
 * - Mobile: starts with 2, 5
 * - Landline: starts with 3
 * - Handles international format (+233 prefix) and 00233 prefix
 *
 * @example
 * validateGH("24 123 4567") // { isValid: true }
 * validateGH("30 212 3456") // { isValid: true }
 * validateGH("+233 24 123 4567") // { isValid: true }
 */
export const validateGH: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00233") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("233") && digits.length >= 12) {
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

  if (!/^[235]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["3 (landline)", "2, 5 (mobile)"],
        country: "Ghana",
      }),
      details: {
        validPrefixes: ["3 (landline)", "2, 5 (mobile)"],
        country: "Ghana",
      },
    };
  }

  return { isValid: true };
};



