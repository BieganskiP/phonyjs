import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Namibia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +264
 * - Format: 9 digits (with leading 0) or 8 digits (without)
 * - Mobile: starts with 8, 85
 * - Landline: starts with 6
 * - Handles international format (+264 prefix) and 00264 prefix
 *
 * @example
 * validateNA("81 123 4567") // { isValid: true }
 * validateNA("61 123 456") // { isValid: true }
 * validateNA("+264 81 123 4567") // { isValid: true }
 */
export const validateNA: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00264") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("264") && digits.length >= 11) {
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

  if (!/^[68]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["6 (landline)", "8 (mobile)"],
        country: "Namibia",
      }),
      details: {
        validPrefixes: ["6 (landline)", "8 (mobile)"],
        country: "Namibia",
      },
    };
  }

  return { isValid: true };
};


