import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Rwanda phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +250
 * - Format: 9 digits
 * - Mobile: starts with 7
 * - Landline: starts with 2
 * - Handles international format (+250 prefix) and 00250 prefix
 *
 * @example
 * validateRW("78 123 4567") // { isValid: true }
 * validateRW("25 123 4567") // { isValid: true }
 * validateRW("+250 78 123 4567") // { isValid: true }
 */
export const validateRW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00250") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("250") && digits.length >= 12) {
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

  if (!/^[27]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "7 (mobile)"],
        country: "Rwanda",
      }),
      details: {
        validPrefixes: ["2 (landline)", "7 (mobile)"],
        country: "Rwanda",
      },
    };
  }

  return { isValid: true };
};


