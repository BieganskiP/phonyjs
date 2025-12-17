import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Zambia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +260
 * - Format: 9 digits
 * - Mobile: starts with 9, 7, 6
 * - Landline: starts with 2, 3
 * - Handles international format (+260 prefix) and 00260 prefix
 *
 * @example
 * validateZM("97 123 4567") // { isValid: true }
 * validateZM("21 123 4567") // { isValid: true }
 * validateZM("+260 97 123 4567") // { isValid: true }
 */
export const validateZM: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00260") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("260") && digits.length >= 12) {
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

  if (!/^[23679]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2, 3 (landline)", "6, 7, 9 (mobile)"],
        country: "Zambia",
      }),
      details: {
        validPrefixes: ["2, 3 (landline)", "6, 7, 9 (mobile)"],
        country: "Zambia",
      },
    };
  }

  return { isValid: true };
};

