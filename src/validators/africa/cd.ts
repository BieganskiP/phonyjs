import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Democratic Republic of the Congo phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +243
 * - Format: 9 digits
 * - Mobile: starts with 8, 9
 * - Landline: starts with 1, 2
 * - Handles international format (+243 prefix) and 00243 prefix
 *
 * @example
 * validateCD("81 123 45 67") // { isValid: true }
 * validateCD("12 123 45 67") // { isValid: true }
 * validateCD("+243 81 123 45 67") // { isValid: true }
 */
export const validateCD: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00243") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("243") && digits.length >= 12) {
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

  if (!/^[1289]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["1, 2 (landline)", "8, 9 (mobile)"],
        country: "Democratic Republic of the Congo",
      }),
      details: {
        validPrefixes: ["1, 2 (landline)", "8, 9 (mobile)"],
        country: "Democratic Republic of the Congo",
      },
    };
  }

  return { isValid: true };
};

