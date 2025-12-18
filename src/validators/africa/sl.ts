import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Sierra Leone phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +232
 * - Format: 8 digits
 * - Mobile: starts with 3, 7, 8
 * - Landline: starts with 2
 * - Handles international format (+232 prefix) and 00232 prefix
 *
 * @example
 * validateSL("76 123 456") // { isValid: true }
 * validateSL("22 123 456") // { isValid: true }
 * validateSL("+232 76 123 456") // { isValid: true }
 */
export const validateSL: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00232") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("232") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 9) {
    digits = digits.slice(1);
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

  if (!/^[2378]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "3, 7, 8 (mobile)"],
        country: "Sierra Leone",
      }),
      details: {
        validPrefixes: ["2 (landline)", "3, 7, 8 (mobile)"],
        country: "Sierra Leone",
      },
    };
  }

  return { isValid: true };
};


