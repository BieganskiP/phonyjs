import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Palau phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +680
 * - Format: 7 digits
 * - Mobile: starts with 6, 7, 8
 * - Landline: starts with 2-5
 * - Handles international format (+680 prefix) and 00680 prefix
 *
 * @example
 * validatePW("775 1234") // { isValid: true }
 * validatePW("488 5678") // { isValid: true }
 * validatePW("+680 775 1234") // { isValid: true }
 */
export const validatePW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00680") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("680") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (!/^[2-8]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2-5 (landline)", "6-8 (mobile)"],
        country: "Palau",
      }),
      details: {
        validPrefixes: ["2-5 (landline)", "6-8 (mobile)"],
        country: "Palau",
      },
    };
  }

  return { isValid: true };
};

