import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Zimbabwe phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +263
 * - Format: 9 digits
 * - Mobile: starts with 7
 * - Landline: starts with 2, 4, 6, 8
 * - Handles international format (+263 prefix) and 00263 prefix
 *
 * @example
 * validateZW("71 234 5678") // { isValid: true }
 * validateZW("24 234 567") // { isValid: true }
 * validateZW("+263 71 234 5678") // { isValid: true }
 */
export const validateZW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00263") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("263") && digits.length >= 12) {
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

  if (!/^[24678]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2, 4, 6, 8 (landline)", "7 (mobile)"],
        country: "Zimbabwe",
      }),
      details: {
        validPrefixes: ["2, 4, 6, 8 (landline)", "7 (mobile)"],
        country: "Zimbabwe",
      },
    };
  }

  return { isValid: true };
};



