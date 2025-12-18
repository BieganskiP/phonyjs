import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Eritrea phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +291
 * - Format: 7 digits
 * - Mobile: starts with 7, 8
 * - Landline: starts with 1
 * - Handles international format (+291 prefix) and 00291 prefix
 *
 * @example
 * validateER("7 123 456") // { isValid: true }
 * validateER("1 123 456") // { isValid: true }
 * validateER("+291 7 123 456") // { isValid: true }
 */
export const validateER: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00291") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("291") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 8) {
    digits = digits.slice(1);
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

  if (!/^[178]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["1 (landline)", "7, 8 (mobile)"],
        country: "Eritrea",
      }),
      details: {
        validPrefixes: ["1 (landline)", "7, 8 (mobile)"],
        country: "Eritrea",
      },
    };
  }

  return { isValid: true };
};



