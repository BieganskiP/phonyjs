import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Equatorial Guinea phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +240
 * - Format: 9 digits
 * - Mobile: starts with 2, 5
 * - Landline: starts with 3
 * - Handles international format (+240 prefix) and 00240 prefix
 *
 * @example
 * validateGQ("222 123 456") // { isValid: true }
 * validateGQ("333 123 456") // { isValid: true }
 * validateGQ("+240 222 123 456") // { isValid: true }
 */
export const validateGQ: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00240") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("240") && digits.length >= 12) {
    digits = digits.slice(3);
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
        country: "Equatorial Guinea",
      }),
      details: {
        validPrefixes: ["3 (landline)", "2, 5 (mobile)"],
        country: "Equatorial Guinea",
      },
    };
  }

  return { isValid: true };
};




