import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Malawi phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +265
 * - Format: 9 digits (with leading 0) or 8 digits (without)
 * - Mobile: starts with 8, 9, 77, 88, 99
 * - Landline: starts with 1
 * - Handles international format (+265 prefix) and 00265 prefix
 *
 * @example
 * validateMW("991 23 45 67") // { isValid: true }
 * validateMW("1 234 567") // { isValid: true }
 * validateMW("+265 991 23 45 67") // { isValid: true }
 */
export const validateMW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00265") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("265") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 9) {
    digits = digits.slice(1);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  if (!/^[1789]\d{6,8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["1 (landline)", "7, 8, 9 (mobile)"],
        country: "Malawi",
      }),
      details: {
        validPrefixes: ["1 (landline)", "7, 8, 9 (mobile)"],
        country: "Malawi",
      },
    };
  }

  return { isValid: true };
};




